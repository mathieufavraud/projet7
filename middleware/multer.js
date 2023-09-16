const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name_extension = file.originalname.split(" ").join("_");
    const name = name_extension.split(".");
    const extension = MIME_TYPES[file.mimetype];
    console.log(Date.now());
    console.log(name[0] + Date.now() + "." + extension);
    callback(null, name[0] + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");

//ajout de la date ne marche pas toujours ?
