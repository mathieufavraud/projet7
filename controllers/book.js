const Book = require("../models/books");

exports.getBooks = (req, res, next) => {};
/* Renvoie un tableau de tous les livres de la base de
données */
exports.getBook = (req, res, next) => {};
/* Renvoie le livre avec l’_id fourni */
exports.bestRating = (req, res, next) => {};
/* Renvoie un tableau des 3 livres de la base de
données ayant la meilleure note moyenne */
exports.setImageurl = (req, res, next) => {};
/* Capture et enregistre l'image, analyse le livre
transformé en chaîne de caractères, et l'enregistre
dans la base de données en définissant
correctement son ImageUrl. Initialise la note moyenne du livre à 0 et le rating
avec un tableau vide. Remarquez que le corps de la
demande initiale est vide ; lorsque Multer est ajouté,
il renvoie une chaîne pour le corps de la demande
en fonction des données soumises avec le fichier */
exports.updateBook = (req, res, next) => {};
/* Met à jour le livre avec l'_id fourni. Si une image est
téléchargée, elle est capturée, et l’ImageUrl du livre
est mise à jour. Si aucun fichier n'est fourni, les
informations sur le livre se trouvent directement
dans le corps de la requête (req.body.title,
req.body.author, etc.). Si un fichier est fourni, le livre
transformé en chaîne de caractères se trouve dans
req.body.book. Notez que le corps de la demande
initiale est vide ; lorsque Multer est ajouté, il renvoie
une chaîne du corps de la demande basée sur les
données soumises avec le fichier */
exports.deleteBook = (req, res, next) => {};
/* Supprime le livre avec l'_id fourni ainsi que l’image
associée */
exports.setRating = (req, res, next) => {};
/* Définit la note pour le user ID fourni.
La note doit être comprise entre 0 et 5.
L'ID de l'utilisateur et la note doivent être ajoutés au
tableau "rating" afin de ne pas laisser un utilisateur
noter deux fois le même livre.
Il n’est pas possible de modifier une note.
La note moyenne "averageRating" doit être tenue à
jour, et le livre renvoyé en réponse de la requête */
