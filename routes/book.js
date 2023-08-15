const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/book");

router.get("books", bookCtrl.getBooks);
router.get("books/:id", bookCtrl.getBook);
router.get("books/bestrating", bookCtrl.bestRating);
router.post("books", bookCtrl.setImageurl);
router.put("books/:id", bookCtrl.updateBook);
router.delete("books/:id", bookCtrl.deleteBook);
router.post("books/:id/rating", bookCtrl.setRating);

module.exports = bookRouter;
