const nodemailer = require('nodemailer');
module.exports.sendmail = async (mailoptions) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'vineethshetty1111@gmail.com',
                pass: 'Vini@1234567890'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        console.log("Transporter is done");

        transporter.sendMail(mailoptions, (err, res) => {
            if (err) {
                console.log("there was a error", err)
            } else {
                console.log("Here is a response", res);

            }
        })
        console.log("mail sent");

    } catch (error) {
        console.log(error);
    }
}