require('dotenv').config();

const nodemailer = require('nodemailer')

async function main(){

let transporter = nodemailer.createTransport({
    service: "outlook",
   port: 587,
    secure: false,
    auth:{
        user:process.env.EMAIL ,
        pass: process.env.PASSWORD,
    },
});

 await transporter.sendMail({
    from:'khushikashinath03@outlook.com',
    to: " khushikashinath03@outlook.com",
    subject: "Hello",
    text:"Hello World?",
    html: "<b>Hello World?</b>",
});

}

main().catch(err=> console.log(err))
