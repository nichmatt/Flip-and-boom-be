const router = require("express").Router();
const { ControllerUser, ControllerLeaderboard } = require("../controllers");
const { Authentication } = require("../middlewares");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.use(Authentication);
// router.get("/leaderboard", ControllerLeaderboard.;
// router.get("/leaderboards", ControllerLeaderboard.updateLB);
router.get("/profile", ControllerUser.getProfile);
router.get("/item", ControllerUser.getItems);

module.exports = router;
