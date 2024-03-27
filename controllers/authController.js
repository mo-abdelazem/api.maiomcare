const Teacher = require("./../models/teacherModel");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  console.log(req.body);

  Teacher.findOne({
    // fullname: req.body.fullname,
    // password: req.body.password,
    username: req.body.username,
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
