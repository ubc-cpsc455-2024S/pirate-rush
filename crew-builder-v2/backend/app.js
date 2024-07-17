const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes");
const membersRouter = require("./routes/membersRoute");
const playersRouter = require("./routes/playersRoute");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('dist'))

app.use("/", indexRouter);
app.use("/members", membersRouter);
app.use("/players", playersRouter);

module.exports = app;
