const multer = require("multer");
const slugify = require("slugify");
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    console.log("Something getting uploaded here!");
    const imageName = slugify(file.originalname);
    const imagePath = `${+new Date()}${imageName}`;
    if (file) {
      req.body.image = `http://${req.get("host")}/media/${imagePath}`;
    }
    cb(null, imagePath);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
