import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to another email provider
  auth: {
    user: "anandverma314@gmail.com", // Your email address
    pass: "ejbg fvcx uohw dkza", // Your email password or app-specific password
  },
});

// Controller to send email
export const sendEmail = async (req: any, res: any) => {
  const { recipient, subject, message, html } = req.body;

  if (!recipient || !subject || !message || !html) {
    return res
      .status(400)
      .json({ error: "Recipient, subject, and message are required" });
  }

  // Render the email HTML using EJS template
  const htmlContent = await ejs.renderFile(
    path.join(__dirname, "../emailTemplate", "emailTemplate.ejs"),
    { name: "name", verificationLink: "verificationLink" }
  );

  const mailOptions = {
    from: "anandverma314@gmail.com",
    to: recipient,
    subject: subject,
    // message: message,
    html: htmlContent,
    // html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "Email sent successfully", info: info.response });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to send email", details: error });
  }
};
