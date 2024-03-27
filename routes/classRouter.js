const express = require("express");
const controller = require("../controllers/classController");
const {
  postValidation,
  putValidation,
  idValidation,
  childIdValidation,
  teacherIdValidation,
  deleteValidation,
} = require("../middlewares/validations/classValidation");
const validatonResult = require("../middlewares/validations/resultValidation");
const router = express.Router();

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(postValidation, validatonResult, controller.insertClass)
  .put(putValidation, validatonResult, controller.updateClass)
  .delete(deleteValidation, validatonResult, controller.deleteClass);

router
  .route("/class/child/:id")
  .get(childIdValidation, validatonResult, controller.getClassChildrenInfo);
router
  .route("/class/teacher/:id")
  .get(teacherIdValidation, validatonResult, controller.getClassSupervisorInfo);
router
  .route("/class/:id")
  .get(idValidation, validatonResult, controller.getClassById);

module.exports = router;
