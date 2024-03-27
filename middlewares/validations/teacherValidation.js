const { body, query, param } = require("express-validator");

exports.postValidation = [
  // body("_id").isMongoId().withMessage("id should be an object id"),
  body("fullname").isAlpha().withMessage("name should be string"),
  body("password").isStrongPassword().withMessage("password is not strong"),
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  body("image").optional().isString().withMessage("image should be string"),
];

exports.putValidation = [
  body("_id").isMongoId().withMessage("id should be an object id"),
  body("fullname").optional().isAlpha().withMessage("name should be string"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage("password is not strong"),
  body("email").optional().isEmail().withMessage("Not a valid e-mail address"),
  body("image").optional().isString().withMessage("image should be string"),
];

exports.deleteValidation = [body("_id").isMongoId().withMessage("Invalid id")];
exports.idValidation = [param("id").isMongoId().withMessage("Invalid id")];
