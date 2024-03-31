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
const authmw = require("../middlewares/authmw");

const router = express.Router();

router
  .route("/class")
  .all(authmw.isAdmin)
  .get(controller.getAllClasses)
  .post(postValidation, validatonResult, controller.insertClass)
  .put(putValidation, validatonResult, controller.updateClass)
  .delete(deleteValidation, validatonResult, controller.deleteClass);

router
  .route("/class/child/:id")
  .get(
    authmw.isAdminOrSupervisor,
    childIdValidation,
    validatonResult,
    controller.getClassChildrenInfo
  );
router
  .route("/class/teacher/:id")
  .get(
    authmw.isAdminOrSupervisor,
    teacherIdValidation,
    validatonResult,
    controller.getClassSupervisorInfo
  );
router
  .route("/class/:id")
  .get(
    authmw.isAdminOrSupervisor,
    idValidation,
    validatonResult,
    controller.getClassById
  );

module.exports = router;
