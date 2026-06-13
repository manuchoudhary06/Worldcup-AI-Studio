const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendFile(filePath) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      cc: process.env.CC_EMAIL,
      subject: "FIFA Generated Scripts",
      text: "Attached are today's generated scripts.",
      attachments: [
        {
          filename: filePath.filename,
          path: filePath,
        },
      ],
    });

    console.log("Email sent successfully");

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error("Failed to send email:", error.message);

    throw error;
  }
}

module.exports = {
  sendFile,
};
