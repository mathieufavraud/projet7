const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");
const uri =
  "mongodb+srv://mathieufavraud:x8BtkSbyB54P9X3I@cluster0.thwwrgm.mongodb.net/?retryWrites=true&w=majority";

const app = express();

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app;
