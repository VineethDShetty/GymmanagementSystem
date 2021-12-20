const { user } = require("pg/lib/defaults");
const pool = require("../../utils/db-config");


module.exports.fetchplan = async (req, res) => {
    try {


        const plans = await pool.query("select * from plans");


        
        // if (plans.rowCount == 0) {
        //     res.status(404).json()
        //     return;
        // }
        console.log(plans.rows)
        return plans.rows;
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports.currentplan = async (req, res) => {
    try {
        const date = new Date();
        const date2 = new Date()
        date2.setDate(date.getDate()+30)
        const plan = await pool.query("select * from user_plan_details where user_id=$1 and edate>=$2 and edate<=$3", [req.body.user,date,date2]);

        console.log(123, plan.rows)

        if (plan.rowCount != 0) {

            const currentplan = await pool.query("select * from plans where planid=$1", [plan.rows[0].planid]);

            console.log(22, currentplan.rows)
            return currentplan.rows
        }
        return [];
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}


module.exports.addplan = async (req, res) => {
    try {
        console.log(333333)
        const body = req.body;

        console.log("planname",body)
        const addplan = await pool.query("insert into plans (plan_name,price,description) values ($1,$2,$3) returning *", [body.planname, body.price, body.plandescription]);


        console.log(addplan.rows[0]);

        const planid = addplan.rows[0].planid;
        console.log(planid);
        // body.trainer.forEach(async(element) => {
        const trainopt = await pool.query("insert into traineroptions values($1,$2)", [planid,body.trainer])
    // });
       
        return;
    } catch (e) {
        console.log(e)
    }
}


module.exports.planapply = async (req, res) => {
    try {

        const id = req.query.id;
        console.log("body",req.body)
        console.log(123,id);

        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        console.log(month, year)
        const date1 = new Date(year,month);

        console.log(date1);
        const date2 = new Date();
        const date3 = new Date();
        date2.setDate(date1.getDate() + 30);
        console.log(date2);
        date3.setDate(date.getDate() + 30);
        console.log(date3);

        const plan = await pool.query("select * from traineroptions where planid=$1", [id]);
        console.log(plan.rows[0])
        const tid = plan.rows[0].trainerid;
        console.log(tid);
        const user_plan = await pool.query("select * from user_plan_details where user_id=$1 and (sdate)>=$2 and (sdate)<=$3", [req.body.user, date1, date2]);
        
        console.log(user_plan.rows);

        if (user_plan.rowCount == 0) {
            const user_plan_insert = await pool.query("insert into user_plan_details  (user_id,sdate,edate,trainerid,planid)values($1,$2,$3,$4,$5) returning *", [req.body.user,date,date3,tid,id])
        
            console.log(user_plan_insert.rows[0]);
            
        }
        else {
            await pool.query("update user_plan_details set planid=$1 where user_id=$2 and sdate>=$3 and sdate<=$4", [id, req.body.user, date, date3]);
        }


        res.status(200).json();

        // const userplan=
        // // const body = req.body;
        
        // return;
    } catch (e) {
        console.log(e)
    }
}


module.exports.fetchuser = async (req, res) => {
    try {
        
        const users = await pool.query("select * from profile where user_id in (select user_id from user_plan_details where trainerid=$1) ", [req.body.user]);

        console.log(users.rows[0]);
        return users.rows

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}