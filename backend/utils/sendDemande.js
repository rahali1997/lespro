import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()
// These id's and secrets should come from .env file.
const CLIENT_ID = '854283613866-dt9ojgi74jcst1u91eqtgkqp72j39g7i.apps.googleusercontent.com';
const CLEINT_SECRET = 'XYKA-v8rreuqBxEtU90PRe9n';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04WfilIpgUOLLCgYIARAAGAQSNwF-L9IrRBoEOrKCPIPeDVLpYW41q4HRQrYvZe00xX3dwxCXAgXMRZ-UlhELnTWrDg6dOcGuDgw';
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
                user: "ahmedrahali250@gmail.com",
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
            if (err) {
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