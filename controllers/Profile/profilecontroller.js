const pool = require("../../utils/db-config");

module.exports.fetch = async (req, res) => {
    try {
        const profile = await pool.query("select * from profile where user_id=$1", [req.body.user]);

        console.log(profile.rows[0])
        return profile.rows[0]
    } catch (e) {
        console.log(e);
    }
}


module.exports.update = async (req, res) => {
    try {
        const profile = await pool.query("select * from profile where user_id=$1", [req.body.user]);
        console.log(12333,req.body);
        console.log(profile.rows[0])
        if (profile.rowCount == 1) {
            await pool.query("update profile set email=$1,name=$2,address=$3,phoneno=$4 where user_id=$5", [req.body.useremail, req.body.username, req.body.address, req.body.phoneno, req.body.user])
        }
        res.status(200).json();
    } catch (e) {
        console.log(e);
    }
}