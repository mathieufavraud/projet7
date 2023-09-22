const sharp = require("sharp");
const fs = require("fs");

//compression du fichier et remplacement
const compression = (req, res, next) => {
  if (req.file) {
    const input = `images/${req.file.filename}`;
    const name = req.file.filename.split(".")[0] + ".webp";
    const output = `images/${name}`;

    sharp(input)
      .webp()
      .toFile(output)
      .then(() => {
        fs.unlink(input, (error) => {
          if (error) {
            console.log(error);
          }
        });
      })
      .catch((error) => console.log(error));

    req.file.path = output;
    req.file.filename = name;
  }
  next();
};

module.exports = compression;
