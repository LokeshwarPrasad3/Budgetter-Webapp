import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sendMessageToUser = async (userName, type, userEmail, subject) => {

    let customizedHTML;
    if (type === "RESET_PASSWORD") {
        const resetPasswordTemplatePath = path.join(__dirname, '../../public/email-template/reset-password-template.html')
        const htmlContent = fs.readFileSync(resetPasswordTemplatePath, 'utf-8');
        // replace placeholder with actual data
        const resetLink = "mylink";
        customizedHTML = htmlContent.replace('{reset_link}', resetLink).replace('{userName}', userName);
    } else {
        console.log("invalid requrest");
        return;
    }

    try {
        // Create a transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'message.reponse.web@gmail.com',
                pass: process.env.GMAIL_PASSKEY,
            }
        });

        // Email options
        let mailOptions = {
            from: 'message.reponse.web@gmail.com',
            to: userEmail,
            subject: `${subject} 🚀`,
            cc: process.env.ADMIN_GMAIL,
            html: customizedHTML
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        console.log('Email sent successfully!', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error
    }
}


export { sendMessageToUser }