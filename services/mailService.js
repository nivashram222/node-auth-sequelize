const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.sendLoginMail = async (email, name) => {
    const mailOptions = {
        from: `"Auth App" <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: "Login Alert",
        html: `
            <h3>Hello ${name}</h3>
            <p>You have successfully logged in.</p>
            <p>If this was not you, please change password immediately.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};