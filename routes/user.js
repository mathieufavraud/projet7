const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//routes pour la gestion des utilisateurs
router.post("/signup", userCtrl.signup); //s'inscrire
router.post("/login", userCtrl.login); //se connecter

module.exports = router;
