const pool = require("../../utils/db-config");


module.exports.fetchmember = async (req, res) => {
    try {
        const profile = await pool.query("select p.name,p.email,p.user_id ,sum(pl.price) from profile p ,user_plan_details u,plans pl  where payment_status=$1 and p.user_id=u.user_id and u.planid=pl.planid group by p.name,p.user_id,p.email",[false]);
        console.log(123,profile.rows);
        return profile.rows;
    } catch (e) {
        console.log(e);
    }
}