require("dotenv").config();
const User = require("../../models/User");
const crypto = require("crypto");
const { sendEmail } = require("../../helpers");
const { APP_NAME, COMPANY_ADDRESS, API_BASE_URL } = process.env;
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  try {
    const { email, name, lastname, username, country, city, password, avatar } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      lastname,
      username,
      country,
      city,
      password: hashedPassword,
      avatar,
    });

    await user.save();

    const token = crypto.randomBytes(64).toString("hex");
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 10);

    user.tokenEmailConfirm = token;
    user.emailTokenExpiresAt = expirationDate;

    // console.log({ token, expirationDate, email, user });

    const { response, error } = await sendEmail({
      subject: `Confirmación de cuenta en ${APP_NAME}`,
      emailTo: email,
      template: "ConfirmAccount",
      vars: {
        appName: APP_NAME,
        userEmail: email,
        companyAddress: COMPANY_ADDRESS,
        urlConfirmAccount: `${API_BASE_URL}/confirm-account?token=${token}`,
        urlCancelAccount: `${API_BASE_URL}/confirm-account?token=${token}&cancel=true`,
      },
    });

    await user.save();

    res.json({ success: true, user, emailResponse: response || error });
  } catch (error) {
    next(error);
  }
};
