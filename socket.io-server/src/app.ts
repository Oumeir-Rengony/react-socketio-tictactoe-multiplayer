var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import * as cors from "cors";
import "reflect-metadata";
import type { VercelRequest, VercelResponse } from '@vercel/node';

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req:VercelRequest , res:VercelResponse, next) {
  next(createError(404));
});


/* health check */
app.get("/health", function (req, res) {
  res.status(200);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
