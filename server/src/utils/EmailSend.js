import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendMessageToUser = async (userName, type, userEmail, subject, token, html = null) => {
  const serverURL = process.env.SERVER_URL;

  let customizedHTML;
  if (type === 'RESET_PASSWORD') {
    const resetPasswordTemplatePath = path.join(
      __dirname,
      '../../public/email-template/reset-password-template.html',
    );
    const htmlContent = fs.readFileSync(resetPasswordTemplatePath, 'utf-8');
    // replace placeholder with actual data
    const resetLink = `${serverURL}/api/user/reset-password/validate/?token=${token}`;
    // console.log(resetLink);
    customizedHTML = htmlContent.replace('{link}', resetLink).replace('{userName}', userName);
  } else if (type === 'VERIFY_ACCOUNT') {
    const accountVerificationTemplatePath = path.join(
      __dirname,
      '../../public/email-template/account-verification.html',
    );
    const htmlContent = fs.readFileSync(accountVerificationTemplatePath, 'utf-8');
    // replace placeholder with actual data
    const resetLink = `${serverURL}/api/user/account-verification/?token=${token}`;
    // console.log(resetLink);
    customizedHTML = htmlContent.replace('{link}', resetLink).replace('{userName}', userName);
  } else if (type === 'DELETE_ACCOUNT') {
    const deleteAccountTemplatePath = path.join(
      __dirname,
      '../../public/email-template/account-delete.html',
    );
    const htmlContent = fs.readFileSync(deleteAccountTemplatePath, 'utf-8');
    // replace placeholder with actual data
    customizedHTML = htmlContent.replace('{userName}', userName);
  } else if (type === 'NEWSLETTER') {
    customizedHTML = html;
  } else {
    console.log('invalid request');
    return;
  }

  try {
    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'message.reponse.web@gmail.com',
        pass: process.env.GMAIL_PASSKEY,
      },
    });

    // Email options
    let mailOptions = {
      from: 'message.reponse.web@gmail.com',
      to: Array.isArray(userEmail) ? userEmail.join(',') : userEmail,
      subject: `${subject} 🚀`,
      bcc: process.env.ADMIN_GMAIL,
      html: customizedHTML,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    // console.log('Email sent: ' + info.response);
    console.log('Email sent successfully! to - ', userEmail);
    return true;
  } catch (error) {
    console.error(`Error during sending email to - ${userEmail}`, error);
    throw error;
  }
};

export { sendMessageToUser };
