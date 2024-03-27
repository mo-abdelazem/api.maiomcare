const Teacher = require("../models/teacherModel");
const Class = require("../models/classModel");

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

exports.insertTeacher = (req, res, next) => {
  let object = new Teacher(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
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
