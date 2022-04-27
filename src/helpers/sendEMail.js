const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { EMAIL_PASSWORD, APP_EMAIL } = process.env;

const sendEmail = async ({
  subject,
  message,
  emailFrom,
  emailTo,
  html = false,
  template = false,
  vars = {},
}) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: APP_EMAIL, // email
        pass: EMAIL_PASSWORD, // application password
      },
    });

    let mailOptions = {
      from: emailFrom || APP_EMAIL, // dirección del remitente
      to: emailTo || APP_EMAIL, // receptor
      subject: subject, // asunto
    };

    if (template) {
      // point to the template folder
      const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve("../assets/emails"),
          defaultLayout: false,
        },
        viewPath: path.resolve("../api/src/assets/emails"),
      };
      mailOptions.template = template;
      mailOptions.context = vars;

      transporter.use("compile", hbs(handlebarOptions));
    } else if (html) mailOptions.html = html;
    else mailOptions.text = message;

    console.log({mailOptions});

    // send mail with defined transport object
    const response = await transporter.sendMail(mailOptions);

    return { response };
  } catch (error) {
    console.log(error.message);
    return { error };
  }
};

// transporter
//   .verify()
//   .then(() => {
//     console.log("Ready for send email");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

module.exports = sendEmail;
