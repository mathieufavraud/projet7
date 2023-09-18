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
    callback(null, name[0] + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");

// pourquoi pas de next() ?
