const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("signup");
  console.log("signup");
};
/* Hachage du mot de passe de l'utilisateur, ajout de
l'utilisateur à la base de données. */

exports.login = (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("login");
  console.log("login");
  /*
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
    */
};
/* Vérification des informations d'identification de
l'utilisateur ; renvoie l’_id de l'utilisateur depuis la
base de données et un token web JSON signé
(contenant également l'_id de l'utilisateur). */

exports.test = (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("test");
  res.end("test");
};
/* Fonction test */
