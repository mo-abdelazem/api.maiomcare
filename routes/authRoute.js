const express = require("express");
const controller = require("./../controllers/authController");
const authmw = require("../middlewares/authmw");
const validation = require("../middlewares/validations/authValidation");
const upload = require("../middlewares/uploadmw_image");
const router = express.Router();

router.post("/login", validation.signinValidation, authmw, controller.login);
router.post(
  "/register",
  upload.uploadPhoto,
  validation.registerValidation,
  controller.register
);

module.exports = router;
