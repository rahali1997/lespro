import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()



function sendVerif(email, verifNumber) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "ahmedrahali250@gmail.com",
            pass: "azertyazerty"
        }
    })

    let mailOptions = {
        from: 'ahmedrahali250@gmail.com',
        to: email,
        subject: 'PureBox',
        text: 'bienvenue sur PureBox, votre code de vérification est: ' +verifNumber
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (!err) {
            console.log('email sended', err)
        } else {
            console.log('email send failed')
        }
    })
}


export default sendVerif;