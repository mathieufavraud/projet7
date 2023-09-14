const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getBooks); //affichage de la liste des livres
router.get("/bestrating", bookCtrl.bestRating); //affichage des trois meilleurs livres
router.get("/:id", bookCtrl.getBook); //affichage du livre avec l'id
router.post("/", auth, multer, bookCtrl.createBook); //creation d'un nouveau livre
router.put("/:id", auth, multer, bookCtrl.updateBook); //mise a jour des informations d'un livre existant
router.delete("/:id", auth, bookCtrl.deleteBook); //supprimer le livre avec l'id
router.post("/:id/rating", auth, bookCtrl.setRating); //donner la note d'un livre avec l'id

module.exports = router;
