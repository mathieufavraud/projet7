const express = require("express");
const router = express.Router();

console.log("chargement module de tests reussi !");
router.get("/", (req, res, next) => {
  console.log("une requete !");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Ceci est un test");
});
router;
router.get("/test", (req, res, next) => {
  console.log("requete get");
});
router.post("/test", (req, res, next) => {
  console.log("requete post");
});

module.exports = router;
