const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Class = require("../models/classModel");

module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decoded_token = jwt.verify(token, process.env.SECRET_KEY);
    req.token = decoded_token;
    next();
  } catch (error) {
    error.message = "not Authenticated";
    next(error);
  }
};

module.exports.isAdmin = (req, response, next) => {
  if (req.decodedObject._doc.role == "admin") {
    next();
  } else {
    let error = new Error("Not Authorized to access");
    error.status = 403;
    next(error);
  }
};
module.exports.isAdminOrTeacher = (req, res, next) => {
  if (
    req.decodedObject._doc._id == (req.body.id || req.params.id) ||
    req.decodedObject._doc.role == "admin"
  ) {
    next();
  } else {
    let error = new Error("Not Authorized to access");
    error.status = 403;
    next(error);
  }
};

module.exports.isAdminOrSupervisor = (req, res, next) => {
  if (req.decodedObject._doc.role == "admin") {
    next();
  } else if (req.decodedObject._doc.role == "supervisor") {
    Class.find({ supervisor: req.decodedObject._doc._id }, { _id: 1 }).then(
      (objects) => {
        if (
          objects
            .map((object) => object._id)
            .includes(Number(req.params.id) || Number(req.body.id))
        )
          next();
        else {
          let error = new Error("Not Authorized to access");
          error.status = 403;
          next(error);
        }
      }
    );
  } else {
    let error = new Error("Not Authorized to access");
    error.status = 403;
    next(error);
  }
};
