import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()

const CLIENT_ID = '743699180184-o48t41vscjld3asujqi8dqmqicu7lpsi.apps.googleusercontent.com';
const CLEINT_SECRET = '9gG-_-2pIplmEHPfgCs41p0v';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04yHLGXotfyJqCgYIARAAGAQSNwF-L9IrD54yYTtbFvMSxYf6Ekhnli8kdnh4fILS1TKRcVxbvPS3ELrvkAcbX4eK93J18_7yHfw';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendD(email, fullname, phone, message) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "ahmedrahali256@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,

            }
        })

        let mailOptions = {
            from: 'LesPro',
            to: email,
            subject: 'LesPro,',
            html: "<div><h3 style='color:red'>Bonjour,vous avez reçu une nouvelle demande</h3>" + "<strong>" + message + "</strong>" + "<h3>Contact </h3>" + "<p>+216" + phone + "</p>" + "<p> " + fullname + "</p>"
        }

        const result = await transporter.sendMail(mailOptions, function (err, data) {
            if (!err) {
                console.log('email sended', err)
            } else {
                console.log('email send failed')
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}


export default sendD;