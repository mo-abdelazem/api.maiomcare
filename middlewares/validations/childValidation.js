const { body, param, query } = require("express-validator");

exports.postValidation = [
  // body("id").isInt().withMessage("Invalid id"),
  body("fullname").isString().withMessage("name should be string"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level should be one of PreKG, KG1, KG2"),
  body("address").isObject().withMessage("Address should be an object"),
  body("address.city").isString().withMessage("City should be a string"),
  body("address.street")
    .optional()
    .isString()
    .withMessage("Street should be a string"),
];
exports.putValidation = [
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level should be one of PreKG, KG1, KG2"),
  body("address")
    .optional()
    .isObject()
    .withMessage("Address should be an object"),
  body("address.city")
    .optional()
    .isString()
    .withMessage("City should be a string"),
  body("address.street")
    .optional()
    .isString()
    .withMessage("Street should be a string"),
];
exports.idValidation = param("id").isInt().withMessage("Invalid id");
exports.deleteValidation = [body("_id").isInt().withMessage("Invalid id")];
