const { Router } = require("express");
const register = require("../controllers/auth/register");

const authRouter = Router();


authRouter.post("/register", register);

module.exports = authRouter;
