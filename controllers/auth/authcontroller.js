const pool = require("../../utils/db-config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const results = validationResult(req);
        // In case of any validation errors, send the first error back to
        // the client with a status of 400 (Bad Request)
        if (!results.isEmpty()) {
            res.status(400)
                .json({ msg: results.array()[0] });

            return;
        }
        // const body = req.body;
        // console.log(body);

        const profile = await pool.query('select * from profile where email=$1 or phoneno=$2', [body.email,body.phoneno]);

        if (profile.rowCount !== 0) {
            res.status(404).json("Account Already Exist")
            return;
            
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        let role = 'U';
        const insertion = await pool.query('insert into profile (email,password,role,name,phoneno) values($1,$2,$3,$4,$5) returning *', [body.email, hash, role,body.name,body.phoneno]);

        if (insertion.rowCount == 0) {
            res.status(400).json("Profile Creation Failed");
            return;
       }
    
        res.status(201).json(insertion.rows[0]);
        


    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}



module.exports.login = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const results = validationResult(req);
        // In case of any validation errors, send the first error back to
        // the client with a status of 400 (Bad Request)
        if (!results.isEmpty()) {
            console.log(11111, results.array()[0])
            res.status(400)
               
                .json(results.array()[0] );

            return;
        }
        // const body = req.body;
        // console.log(body);

        const profile = await pool.query('select * from profile where email=$1', [body.email]);

        if (profile.rowCount == 0) {
            res.status(404).json("Account Not Found")
            return;

        }
        const hash = profile.rows[0].password;
        const passCheck = await bcrypt.compare(body.password, hash);
        console.log("22", passCheck);

        if (!passCheck) {
            res.status(403).json("Password Incorrect");
            return;
        }
        const jwt_secret = process.env.JWT_SECRET || 'somesecret';
        const token = await jwt.sign({
            email: profile.rows[0].email,
            user_id: profile.rows[0].user_id,
            type: profile.rows[0].role,
            name:profile.rows[0].name,
        }, jwt_secret)

        console.log(111, token);
        res.cookie('access_token', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),

            httpOnly: true,
            path:'/'
        })
        res.status(200).json("Successful");



    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        path: '/'
    })
        .sendStatus(200);
};
