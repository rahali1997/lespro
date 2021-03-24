import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()



function sendD(email,fullname,phone,message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ahmedrahali250@gmail.com",
            pass: "azertyazerty"
        }
    })

    let mailOptions = {
        from: 'ahmedrahali250@gmail.com',
        to: email,
        subject: 'PureBox,',
        html:"<div><h3 style='color:red'>Bonjour,vous avez reçu une nouvelle demande</h3>"+"<strong>"+message+"</strong>" +"<h3>Contact </h3>"+"<p>+216"+phone+"</p>"+"<p> "+fullname+"</p>"
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (!err) {
            console.log('email sended', err)
        } else {
            console.log('email send failed')
        }
    })
}


export default sendD;