const { body } = require("express-validator");

exports.signinValidation = [
  body("username").exists().notEmpty().withMessage("username is required"),
  body("password").exists().notEmpty().withMessage("password is required"),
];
exports.registerValidation = [
  body("fullname").isString().withMessage("name should be string"),
  body("password").isString().withMessage("password should be string"),

  body("confirmPassword")
    .exists()
    .withMessage("ConfirmPassword is required")
    .custom((repasswordValue, { req }) => repasswordValue == req.body.password)
    .withMessage("Passwords do not match"),

  body("username").isString().withMessage("username should be string"),
  body("email").isEmail().withMessage("email is not vaild"),
  body("image").optional().isString().withMessage("image should be string"),
];
