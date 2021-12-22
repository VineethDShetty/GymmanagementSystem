const { user } = require("pg/lib/defaults");
const pool = require("../../utils/db-config");
const nodemailer = require("nodemailer")
const sendmail=require("../../controllers/auth/sendmail")


module.exports.fetchplan = async (req, res) => {
    try {


        const plans = await pool.query("select * from plans p ,traineroptions t,profile pr where t.trainerid=pr.user_id and p.planid=t.planid");


        
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

            const currentplan = await pool.query("select * from plans p , traineroptions t ,profile pr where p.planid=$1 and t.planid=p.planid and t.trainerid=pr.user_id", [plan.rows[0].planid]);

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
        const plans = await pool.query("select * from plans where planid=$1", [id]);
        const plan = await pool.query("select * from traineroptions where planid=$1", [id]);
        console.log(plan.rows[0])
        const tid = plan.rows[0].trainerid;
        console.log(tid);
        const user_plan = await pool.query("select * from user_plan_details where user_id=$1 and (sdate)>=$2 and (sdate)<=$3", [req.body.user, date1, date2]);
        
        console.log(user_plan.rows);

        if (user_plan.rowCount == 0) {
            const user_plan_insert = await pool.query("insert into user_plan_details  (user_id,sdate,edate,trainerid,planid,amt)values($1,$2,$3,$4,$5,$6) returning *", [req.body.user,date,date3,tid,id,plans.rows[0].price])
        
            console.log(user_plan_insert.rows[0]);
            
        }
        else {
            await pool.query("update user_plan_details set planid=$1 ,amt=$5 where user_id=$2 and edate>=$3 and edate<=$4", [id, req.body.user, date, date3,plans.rows[0].price]);
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

module.exports.update = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        body.users.forEach(async (element) => {
            console.log("ele",element)
            const attend = await pool.query("select * from attendence where user_id=$1 and currentdate=$2", [element, body.date]);

            if (attend.rowCount == 0) {
                console.log(1111);
                const users = await pool.query("insert into attendence values($1,$2) returning * ", [element, body.date]);

                console.log("11111111",users.rows)
            }
        });
       
        res.status(200).json();
        // console.log(users.rows[0]);
        // return users.rows

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}



module.exports.contactus = async (req, res) => {
    try {
        const body = req.body;
        console.log(123,body);

       const contact= await pool.query("insert into contact (email,name,phoneno,message) values ($1,$2,$3,$4) returning *", [body.email, body.name, body.phoneno, body.subject])
        
        if (contact.rowCount == 1) {
            const html = `<h3 style="font-family: aerial ;">Hi ${contact.rows[0].name}!!</h3>


     <p style="font-family: aerial;">

      We have received your message .Our Team will evaluate your request and get back to you soon ..
      Thank you.<br><br>
     
     
     
     <b>Best regards,</b><br>

     GYM Management System <br>
     (5 th Sem D sec)<br>
    NMAMIT,nitte<br>
     Nitte ,Udupi - 574110
     
        
     </p>`
            const mailoptions = {
                from: "=vineethshetty1111@gmail.com",
                to: `${contact.rows[0].email}`,
                subject: "The Request is Received",
                text: ``,
                html: html
            }
            await sendmail.sendmail(mailoptions);
      }



        res.status(200).json();
        // console.log(users.rows[0]);
        // return users.rows

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}



module.exports.fetchcontacts = async (req, res) => {
    try {
        const contact = await pool.query("select * from contact where status=$1", [false]);
        console.log(contact.rows[0]);
        return contact.rows;



       
        // console.log(users.rows[0]);
        // return users.rows

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}


module.exports.contactreply = async (req, res) => {
    try {
        const body = req.body;
        console.log(123, body);

        const contact = await pool.query("select * from contact where contactid=$1", [body.contactid]);
        
            const html = `<h3 style="font-family: aerial ;">Hi ${contact.rows[0].name}!!</h3>


     <p style="font-family: aerial;">

     We have Evaluated your Feedback and our team as sent the below Solution.

     <pre>${body.message}</pre>
     
     
     
     <b>Best regards,</b><br>

     GYM Management System <br>
     (5 th Sem D sec)<br>
    NMAMIT,nitte<br>
     Nitte ,Udupi - 574110
     
        
     </p>`
            const mailoptions = {
                from: "=vineethshetty1111@gmail.com",
                to: `${contact.rows[0].email}`,
                subject: "Response to the Feedback",
                text: ``,
                html: html
            }
            await sendmail.sendmail(mailoptions);
       



        res.status(200).json();
        // console.log(users.rows[0]);
        // return users.rows

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}


module.exports.delete = async (req, res) => {
    try {
        console.log(req.query.id);
        await pool.query("update contact set status=$1 where contactid=$2", [true, req.query.id]);
        
        res.status(200).json();




        // console.log(users.rows[0]);
        // return users.rows

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports.payment = async (req, res) => {
    try {
        console.log(123, req.query.id);
        const i = 0;
        await pool.query("update user_plan_details set payment_status=$1,amt=$3 where user_id=$2 ", [true, req.query.id,i]);
        res.status(200).json();


    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}




