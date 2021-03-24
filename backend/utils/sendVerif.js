import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
import { google }  from'googleapis'

// These id's and secrets should come from .env file.
const CLIENT_ID = '854283613866-h7nq2a68ce81ns4kgvgu3vt6c0n616jq.apps.googleusercontent.com';
const CLEINT_SECRET = 'gfwphS1zQLWuS6sgMnkCO6aT';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04zV36HRZsIR-CgYIARAAGAQSNwF-L9IrOf3IRemxcmE0tAsXPHAH3fc1t1292r45pXBgiqWzsVlKQXxjWjEAXAYEusNHd_8mTXI';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
 
  


function sendVerif(email, verifNumber) {
    try {
    const accessToken = await oAuth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "ahmedrahali256@gmail.com",
            pass: "appleone",
            clientId: CLIENT_ID,
            clientSecret: CLEINT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    })

    let mailOptions = {
        from: 'ahmedrahali256@gmail.com',
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
} catch(err) {
    console.log(err)
} }


export default sendVerif;