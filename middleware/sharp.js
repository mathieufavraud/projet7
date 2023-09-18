const sharp = require("sharp");
const fs = require("fs");

const compression = (req, res, next) => {
  const input = `images/${req.file.filename}`;
  const output = `images/${req.file.filename}.webp`;

  console.log(input);

  sharp(input)
    .webp()
    .toFile(output)
    .then((info) => console.log("conversion reussie " + info))
    .catch((error) => console.log(error));
  req.file.path = output;
  req.file.filename += ".webp";
  /*
  fs.unlink(input, (error) => {
    if (error) {
      console.log(error);
    }
  });
  */
  next();
};

module.exports = compression;

//verification avant le fs unlink ?
//suppression en asychrone ?
