import nodemailer from "nodemailer";

export async function sendResetEmail(email: string,resetPasswordTemplate:any,subject:string) {
  // Create Nodemailer transporter (replace with your email service provider configuration)

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  // Compose email message
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: subject,
    html: resetPasswordTemplate,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
