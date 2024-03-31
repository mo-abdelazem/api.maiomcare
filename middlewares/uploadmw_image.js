const multer = require("multer");
const fs = require("fs");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Can upload images only"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");

const extension = (req) =>
  req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
exports.extension = extension;

exports.saveImage = (folder, data, req, res, next) => {
  const folderPath = `public/images/${folder}`;

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      return next(err);
    }

    fs.writeFile(
      path.join(folderPath, `${data._id}.${extension(req)}`),
      req.file.buffer,
      (err) => {
        if (err) {
          return next(err);
        } else {
          next();
        }
      }
    );
  });
};
