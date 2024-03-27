const Class = require("../models/classModel");

exports.getAllClasses = (req, res, next) => {
  Class.find()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getClassById = (req, res, next) => {
  console.log(req.params);
  Class.findOne({ classId: req.params.id })
    .then((object) => {
      if (object == null) throw new Error("Class doesn't exist");
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

exports.getClassChildrenInfo = (req, res, next) => {
  Class.findOne({ classId: req.params.id }, { children: 1 })
    .then((object) => {
      if (object == null) throw new Error("Class doesn't exist");
      return object.populate("children");
    })
    .then((object) => {
      res.status(200).json(object.children);
    })
    .catch((error) => next(error));
};

exports.getClassSupervisorInfo = (req, res, next) => {
  Class.findOne({ classId: req.params.id })
    .then((object) => {
      if (object == null) throw new Error("Class doesn't exist");
      return object.populate("supervisor");
    })
    .then((object) => {
      res.status(200).json(object.supervisor);
    })
    .catch((error) => next(error));
};

exports.insertClass = (req, res, next) => {
  let object = new Class(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateClass = (req, res, next) => {
  Class.findOneAndUpdate({ classId: req.body.id }, req.body, { new: true })
    .then((object) => {
      if (object == null) throw new Error("Class doesn't exist");
      res.status(200).json(object);
    })
    .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
  Class.deleteOne({
    classId: req.body.id,
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
