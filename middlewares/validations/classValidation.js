const { body, param, query } = require("express-validator");
exports.postValidation = [
  // body("id").isInt().withMessage("Invalid Child ID"),
  body("name").isString().withMessage("Name should be a string"),
  body("supervisor")
    .isMongoId()
    .withMessage("Supervisor ID should be an object id"),
  body("children").isArray().withMessage("Children should be an array"),
  body("children.*").isInt().withMessage("Children IDs should be integers"),
];

exports.putValidation = [
  body("name").optional().isString().withMessage("Name should be a string"),
  body("supervisor")
    .optional()
    .isInt()
    .withMessage("Supervisor ID should be an integer"),
  body("children")
    .optional()
    .isArray()
    .withMessage("Children should be an array"),
  body("children.*")
    .optional()
    .isInt()
    .withMessage("Children IDs should be integers"),
];

exports.idValidation = param("id").isInt().withMessage("Invalid ID");

exports.childIdValidation = param("id").isInt().withMessage("Invalid Child ID");

exports.teacherIdValidation = param("id")
  .isInt()
  .withMessage("Invalid Teacher ID");

exports.deleteValidation = [body("id").isInt().withMessage("Invalid id")];
