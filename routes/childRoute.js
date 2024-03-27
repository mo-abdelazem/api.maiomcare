const express = require("express");
const controller = require("../controllers/childController");
const {
  postValidation,
  putValidation,
  idValidation,
  deleteValidation,
} = require("../middlewares/validations/childValidation");
const validatonResult = require("../middlewares/validations/resultValidation");
const router = express.Router();

router
  .route("/children")
  .get(controller.getAllChildrens)
  .post(postValidation, validatonResult, controller.insertChild)
  .put(putValidation, validatonResult, controller.updateChild);

router
  .route("/children/:id")
  .get(idValidation, validatonResult, controller.getChildById);
router
  .route("/children")
  .delete(deleteValidation, validatonResult, controller.deleteChild);

module.exports = router;
