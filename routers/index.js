const router = require("express").Router();
const { ControllerUser, ControllerNews, ControllerItem } = require("../controllers");
const { Authentication } = require("../middlewares");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.use(Authentication);
router.get("/leaderboard", ControllerUser);
router.post()
router.get("/user", ControllerUser.getProfile);
router.patch("user", ControllerUser)
router.patch("user/skin", ControllerUser)
router.patch("user/char", ControllerUser)
router.get("/items",ControllerItem.getItem)
router.get("/news" ,ControllerNews.getNews)
router.get("/collections", ControllerUser)
router.post("/collections", ControllerUser)

module.exports = router;
