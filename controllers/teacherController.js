const Teacher = require("../models/teacherModel");
const Class = require("../models/classModel");

const image = require("../middlewares/uploadmw_image");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAllTeachers = (req, res, next) => {
  Teacher.find()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getTeacherById = (req, res, next) => {
  Teacher.findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) throw new Error("Teacher doesn't exist");
      res.status(200).json(object);
    })
    .catch((error) => next(error));
};

exports.getTeacherSupervisors = (req, res, next) => {
  Class.find({}, { supervisor: 1, _id: 0 })
    .populate("supervisor")
    .then((objects) => {
      res.status(200).json({ data: "supervisors" });
    })
    .catch((error) => next(error));
};

exports.insertTeacher = (request, response, next) => {
  try {
    const { fullname, username, password, email } = request.body;
    console.log(fullname, username, password, email);
    if (!fullname || !username || !password || !email) {
      throw new Error("Missing required fields");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const { file } = request;
    const teacherObject = new Teacher({
      fullname,
      username,
      password: hash,
      email,
      image: file?.filename,
    });

    teacherObject
      .save()
      .then((data) => {
        data.password = password;
        image.saveImage("teacher", data, request, response, next);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

exports.updateTeacher = (req, res, next) => {
  Teacher.findOneAndUpdate({ _id: req.body._id }, req.body, {
    new: true,
  })
    .then((object) => {
      if (!object) throw new Error("Teacher doesn't exist");
      res.status(200).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (req, res, next) => {
  Teacher.findByIdAndDelete(req.body._id)
    .then((object) => {
      if (!object) throw new Error("Teacher doesn't exist");
      return Class.updateMany(
        { supervisor: req.body._id },
        { $set: { supervisor: null } }
      );
    })
    .then((object) => {
      res.status(200).json(object);
    })
    .catch((error) => next(error));
};

exports.updatePassword = (req, res, next) => {
  bcrypt
    .hash(req.body.newPassword, 10)
    .then((hash) => {
      if (req.token.role === "admin") {
        TeacherSchema.findOneAndUpdate(
          { email: req.body.email },
          { password: hash }
        )
          .then(() => {
            res.status(200).json({
              status: "success",
              message: "Changed password successfully",
            });
          })
          .catch((error) => next(error));
      } else {
        TeacherSchema.findOneAndUpdate(
          { email: req.body.email },
          { password: hash },
          { new: true, select: "password" }
        )
          .then((data) => {
            if (!data) {
              throw new Error("User not found");
            }
            return bcrypt.compare(req.body.password, data.password);
          })
          .then((result) => {
            if (result) {
              res.status(200).json({
                status: "success",
                message: "Changed password successfully",
              });
            } else {
              throw new Error("Wrong Password");
            }
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
};
