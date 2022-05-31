const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const passport = require("passport");
// body parser to post json data in to database
const bodyParser = require("body-parser");

// Load Mongoose
const mongoose = require("mongoose");
// dotenv
const {
  DB_URI
} = require("./src/config");
// route
const jobPostRoute = require("./src/routes/jobPostRoute");
const applyJobRoute = require("./src/routes/applyJobRoute");
const passport = require("passport");

// port
const port = process.env.PORT || 5655

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5655",
    methods: "GET,PUT,POST,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(passport.se)

app.use(passport.initialize());
app.use(bodyParser.json());
require("../AccountService/src/middleWares/passport")(passport);

mongoose
  .connect(DB_URI)
  .then(console.log("Database is up and running"))
  .catch((err) => console.log(err));

// setting the route for the book

app.use("/microservice/accountService/employer/jobPost", jobPostRoute);
app.use("/microservice/accountService/employee/applyForJob", applyJobRoute);

app.listen(port, () => {
  console.log("Job Service is up and running on port " + port);
});