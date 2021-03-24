import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()

const CLIENT_ID = '692778146704-dm54k6be2cijeabnonk3ik4elmi8c8mv.apps.googleusercontent.com';
const CLEINT_SECRET = 'YbWxdkIIH7NY79WfE-vDh632';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04ysBlKgE_SkjCgYIARAAGAQSNwF-L9IrmL9pZYra9bo3WcS6Dqi8_eveKjmLjIN2vlJzqzGvh44xrnIOKsbk389m-L1SXuoeAvo';

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
            from: 'ahmedrahali256@gmail.com',
            to: email,
            subject: 'PureBox,',
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