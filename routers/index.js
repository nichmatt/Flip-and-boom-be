const router = require("express").Router();
const { ControllerUser, ControllerLeaderboard } = require("../controllers");
const { Authentication } = require("../middlewares");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.use(Authentication);
router.get("/profile", ControllerUser.getProfile);
router.put("/update", ControllerUser.updateUser);
router.patch("/updateScore", ControllerUser.updateScore);
router.get("/items", ControllerUser.getItems);

module.exports = router;
