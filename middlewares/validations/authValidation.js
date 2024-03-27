const { body } = require("express-validator");

exports.signinValidation = [
  body("username").exists().notEmpty().withMessage("username is required"),

  body("password").exists().notEmpty().withMessage("password is required"),
];
