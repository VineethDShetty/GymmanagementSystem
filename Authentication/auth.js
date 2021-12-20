const JWT = require('jsonwebtoken');

module.exports.auth=async(req, res)=> {
    let token = req.cookies.access_token;
    console.log(123,token)
    if (!token) {
        res.redirect('/')
        return;
    }
    try {
        var result = JWT.verify(token, process.env.JWT_SECRET || 'somesecret');
        console.log(result);
        if (!result) {
            return res.status(403).json("Invalid users.....")
        }
        req.body.user = result.user_id;
        req.body.type = result.type;
        req.body.name = result.name;
        console.log(req.body.user)
        console.log(req.body.type)

        

        

        
        return ;
    } catch (err) {
        console.log(result);
        console.log(err);
        return res.status(500).json({
            server: 'Token info invalid'
        });
    }
}

