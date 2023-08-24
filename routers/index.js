const router = require("express").Router();
const { ControllerUser } = require("../controllers");

router.use("/register", ControllerUser.register);
router.use("/login", ControllerUser.login);

module.exports = router;
