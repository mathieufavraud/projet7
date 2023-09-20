const sharp = require("sharp");
const fs = require("fs");

const compression = (req, res, next) => {
  const input = `images/${req.file.filename}`;
  const output = `images/${req.file.filename}.webp`;

  sharp(input)
    .webp()
    .toFile(output)
    .then(() => {
      console.log("conversion reussie");
      /*
      fs.unlink(input, (error) => {
        if (error) {
          console.log(error);
        }
      });
      */
    })
    .catch((error) => console.log(error));
  req.file.path = output;
  req.file.filename += ".webp";
  next();
};

module.exports = compression;

//verification avant le fs unlink ?
//suppression en asychrone ?
