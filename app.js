const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoute");
const authmw = require("./middlewares/authmw");

const teacherRoute = require("./routes/teacherRoute");
const childRoute = require("./routes/childRoute");
const classRoute = require("./routes/classRouter");
const server = express();
import swaggerDocs from "./swagger.js";

require("dotenv").config();

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected....");

    server.listen(PORT, () => {
      console.log("I am listening..........", PORT);
    });
    swaggerDocs(express, PORT);
  })
  .catch((error) => {
    console.log("DB Problem ..." + error);
  });

server.use(express.json());
server.use(authRoute);
server.use(authmw);

server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});
