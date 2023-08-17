const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getBooks);
router.get("/:id", bookCtrl.getBook);
router.get("/bestrating", bookCtrl.bestRating);
router.post("/", bookCtrl.setImageURL);
router.put("/:id", bookCtrl.updateBook);
router.delete("/:id", bookCtrl.deleteBook);
router.post("/:id/rating", bookCtrl.setRating);

router.get("/test", bookCtrl.test); //fonction test

module.exports = router;
