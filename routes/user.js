const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/test", (req, res, next) => {
  console.log("une requete !");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Ceci est un test user");
});
//router.get("/test", userCtrl.test); //fonction test

module.exports = router;
