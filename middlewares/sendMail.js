import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const password = process.env.PASS
const fromEmail = process.env.FROM_EMAIL
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  auth: {
    user: fromEmail,
    pass: password,
  },
});


async function sendMail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: fromEmail,
    to,
    subject,
    text,
    html,
  });
}
export default sendMail;