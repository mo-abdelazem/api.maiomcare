const mongoose = require("mongoose");

const Child = require("../models/childModel");
const Class = require("../models/classModel");

exports.getAllChildrens = (req, res, next) => {
  Child.find()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getChildById = (req, res, next) => {
  Child.findOne({ _id: req.params.id })
    .then((object) => {
      if (object == null) throw new Error("Child doesn't exist");
      res.status(200).json({ data: req.params });
    })
    .catch((error) => next(error));
};

exports.insertChild = (req, res, next) => {
  let object = new Child(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
  Child.findOneAndUpdate({ _id: req.body._id }, req.body, {
    new: true,
  }).then((object) => {
    if (object == null) throw new Error("Child doesn't exist");
    res.status(200).json(object);
  });
};

exports.deleteChild = (req, res, next) => {
  Child.findByIdAndDelete({ _id: req.body._id })
    .then((object) => {
      if (object == null) throw new Error("Child doesn't exist");
      return Class.updateMany(
        { children: req.body._id },
        { $pull: { children: req.body._id } }
      );
    })
    .then((object) => {
      res.status(200).json(object);
    })
    .catch((error) => next(error));
};
