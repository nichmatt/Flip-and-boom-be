const router = require("express").Router();
const { ControllerUser, ControllerLeaderboard } = require("../controllers");
const { Authentication } = require("../middlewares");

router.use("/register", ControllerUser.register);
router.use("/login", ControllerUser.login);
router.use(Authentication);
router.get("/leaderboard", ControllerLeaderboard.getLB);
router.get("/leaderboards", ControllerLeaderboard.updateLB);
router.get("/profile", ControllerUser.getProfile);

module.exports = router;
