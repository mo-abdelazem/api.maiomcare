const express = require("express");
const controller = require("../controllers/childController");
const {
  postValidation,
  putValidation,
  idValidation,
  deleteValidation,
} = require("../middlewares/validations/childValidation");
const validatonResult = require("../middlewares/validations/resultValidation");
const authmw = require("../middlewares/authmw");

const router = express.Router();

router
  .route("/children")
  .all(authmw.isAdmin)
  .get(controller.getAllChildrens)
  .post(postValidation, validatonResult, controller.insertChild)
  .put(putValidation, validatonResult, controller.updateChild);

router
  .route("/children/:id")
  .get(authmw.isAdmin, idValidation, validatonResult, controller.getChildById);
router
  .route("/children")
  .delete(
    authmw.isAdmin,
    deleteValidation,
    validatonResult,
    controller.deleteChild
  );

module.exports = router;
