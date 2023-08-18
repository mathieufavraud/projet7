const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");
const User = require("./models/users");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const Tests = require("./test");

const uri =
  "mongodb+srv://mathieufavraud:x8BtkSbyB54P9X3I@cluster0.thwwrgm.mongodb.net/?retryWrites=true&w=majority";
const app = express();

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("api/books", bookRoutes);
app.use("api/auth", userRoutes);
app.use("api/tests", Tests);

app.get("/api/test", (req, res, next) => {
  console.log("une requete !");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Ceci est un test");
});

/*
app.use("api/auth/login", (req, res) => {
  console.log("une requete !");
  res.status(201);
  res.json({ message: "Votre requête a bien été reçue !" });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



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
*/
module.exports = app;
