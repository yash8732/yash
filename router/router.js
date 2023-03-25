const { getChat, signUp, handleSignUp } = require("../controller/controller");

const router = require("express").Router();

router
.route("/chat")
.get(getChat)

router
.route("/signup")
.get(signUp)
.post(handleSignUp)

module.exports = router

