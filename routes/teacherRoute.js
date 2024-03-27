const express = require("express");
const controller = require("../controllers/teacherController");
const authmw = require("../middlewares/authmw");
const {
  postValidation,
  putValidation,
  idValidation,
  deleteValidation,
} = require("../middlewares/validations/teacherValidation");
const validatonResult = require("../middlewares/validations/resultValidation");
const router = express.Router();

router
  .route("/teachers")
  .get(authmw, controller.getAllTeachers)
  .post(authmw, postValidation, validatonResult, controller.insertTeacher)
  .put(putValidation, validatonResult, controller.updateTeacher);

router.route("/teachers/supervisors").get(controller.getTeacherSupervisors);
router.get(
  "/teachers/:id",
  idValidation,
  validatonResult,
  controller.getTeacherById
);
router
  .route("/teachers")
  .delete(deleteValidation, validatonResult, controller.deleteTeacher);

module.exports = router;
