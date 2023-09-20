const Book = require("../models/books");
const fs = require("fs");
//const Rating = require("./models/books");

exports.getBooks = (req, res, next) => {
  Book.find()
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};
/* Renvoie un tableau de tous les livres de la base de
données */

exports.getBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};
/* Renvoie le livre avec l’_id fourni */

exports.bestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => res.status(400).json({ error }));
};
/* Renvoie un tableau des 3 livres de la base de
données ayant la meilleure note moyenne */

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
/* Capture et enregistre l'image, analyse le livre
transformé en chaîne de caractères, et l'enregistre
dans la base de données en définissant
correctement son ImageUrl. Initialise la note moyenne du livre à 0 et le rating
avec un tableau vide. Remarquez que le corps de la
demande initiale est vide ; lorsque Multer est ajouté,
il renvoie une chaîne pour le corps de la demande
en fonction des données soumises avec le fichier */

exports.updateBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Modification non autorisée" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "livre modifié" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
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

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      Book.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "livre supprimé" });
          const url = book.imageUrl.split("/").slice(1);
          fs.unlink(`images/${url[3]}`, (error) => {
            if (error) {
              console.log(error);
            }
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
/* Supprime le livre avec l'_id fourni ainsi que l’image
associée */
const Rating = (rating, id) => {
  return rating === id;
};

exports.setRating = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      const newRating = [
        { userId: `${req.params.id}`, grade: `${req.body.rating}` },
      ];
      book.ratings.push(...newRating);
      let sum = 0;
      for (let i = 0; i < book.ratings.length; i++) {
        sum = sum + book.ratings[i].grade;
      }
      book.averageRating = parseInt(sum / book.ratings.length);
      if (book.ratings.userId.some(Rating(rating, req.params.id))) {
        console.log("livre deja noté");
        //renvoyer le livre quand même ?
        res.status(403).json({ message: "vous avez déja noté ce livre" });
      } else {
        console.log("livre noté");
        console.log(book);
        book
          .save()
          .then((book) => {
            res.status(200).json(book);
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
/* Définit la note pour le user ID fourni.
La note doit être comprise entre 0 et 5.
L'ID de l'utilisateur et la note doivent être ajoutés au
tableau "rating" afin de ne pas laisser un utilisateur
noter deux fois le même livre.
Il n’est pas possible de modifier une note.
La note moyenne "averageRating" doit être tenue à
jour, et le livre renvoyé en réponse de la requête */

//passage de la note entière n'est pas satisfaisant
//le test avec some() ne fonctionne pas ?

/*
Book.findOne({ _id: req.params.id })
    .then((book) => {
      const newRating = [
        { userId: `${req.params.id}`, grade: `${req.body.rating}` },
      ];
      book.ratings.push(...newRating);
      let sum = 0;
      for (let i = 0; i < book.ratings.length; i++) {
        sum = sum + book.ratings[i].grade;
      }
      book.averageRating = parseInt(sum / book.ratings.length);
      console.log(req.params.id);
      console.log(rating.userId);
      if (book.ratings.some((rating) => req.params.id === rating.userId)) {
        console.log("livre deja noté");
        res.status(403).json({ message: "vous avez déja noté ce livre" });
      } else {
        console.log("livre noté");
        console.log(book);
        book
          .save()
          .then((book) => {
            res.status(200).json(book);
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => res.status(404).json({ error }));
    */
