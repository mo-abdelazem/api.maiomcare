const Teacher = require("./../models/teacherModel");
const image = require("../middlewares/uploadmw_image");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (req, res, next) => {
  Teacher.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((object) => {
      if (!object) {
        throw new Error("Not Authenticated");
      }

      let token = jwt.sign(
        {
          _id: object._id,
          role: "Teacher",
        },
        process.env.SECRET_KEY,
        { expiresIn: "1hr" }
      );

      res.json({ data: "Authenticated", token });
    })
    .catch((error) => next(error));
};

exports.register = (request, response, next) => {
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
        // response.status(200).json(data);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};
