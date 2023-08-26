const express = require("express");
const router = express.Router();
const auth = require ("../middleware/auth");
const multer = require("../middleware/multer-config")
const bookCtrl = require("../controllers/book");

router.get("/", auth, bookCtrl.getBooks);
router.get("/:id", auth, bookCtrl.getBook);
router.get("/bestrating", auth, bookCtrl.bestRating);
router.post("/", auth, multer, bookCtrl.setImageURL);
router.put("/:id", auth, multer, bookCtrl.updateBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.setRating);

module.exports = router;
