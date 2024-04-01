const express = require("express");
const controller = require("../controllers/teacherController");
const authmw = require("../middlewares/authmw");
const upload = require("../middlewares/uploadmw_image");

const {
  postValidation,
  putValidation,
  idValidation,
  deleteValidation,
  changePassword,
} = require("../middlewares/validations/teacherValidation");
const validatonResult = require("../middlewares/validations/resultValidation");
const router = express.Router();

router
  .route("/teachers")
  .get(authmw, controller.getAllTeachers)
  .post(
    upload.uploadPhoto,
    authmw.isAdminOrSupervisor,
    postValidation,
    validatonResult,
    controller.insertTeacher
  )
  .put(
    authmw.isAdminOrSupervisor,
    putValidation,
    validatonResult,
    controller.updateTeacher
  );

router.route("/teachers/supervisors").get(controller.getTeacherSupervisors);
router.get(
  "/teachers/:id",
  authmw,
  idValidation,
  validatonResult,
  controller.getTeacherById
);
router
  .route("/teachers")
  .delete(
    authmw.isAdminOrSupervisor,
    deleteValidation,
    validatonResult,
    controller.deleteTeacher
  );
router
  .route("/teachers/:id/change-password")
  .put(
    authmw.isAdminOrSupervisor,
    changePassword,
    validatonResult,
    controller.updateTeacher
  );
module.exports = router;
