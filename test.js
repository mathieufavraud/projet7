const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("une requete !");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Ceci est un test");
});
router;
router.get("/test", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("requete get");
  console.log("requete get");
});
router.post("/test", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("requete post");
  console.log("requete post");
});

module.exports = router;
