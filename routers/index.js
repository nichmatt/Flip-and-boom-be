const router = require("express").Router();
const { ControllerUser, ControllerNews, ControllerItem } = require("../controllers");
const { Authentication } = require("../middlewares");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
// router.use(Authentication);
router.get("/leaderboard", );
router.get("/profile", ControllerUser.getProfile);
router.put("/update", ControllerUser)
router.patch("/updateScore", ControllerUser)
router.get("/items",ControllerItem.getItem)
router.get("/news" ,ControllerNews.getNews)
router.post("/user/topup" ,ControllerUser.topupBalance)
router.post("/user/token-midtrans" ,ControllerUser.generateTokenMidtrans)
router.get("/collections", ControllerUser)
router.post("/collections", ControllerUser)
router.get("/leaderboard")
router.get("/leaderboards");

module.exports = router;
