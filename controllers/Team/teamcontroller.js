const pool = require("../../utils/db-config");


module.exports.fetchmember = async (req, res) => {
    try {
        const profile = await pool.query("select * from profile");

        return profile.rows;
    } catch (e) {
        console.log(e);
    }
}