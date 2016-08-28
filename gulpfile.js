"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var uglifyCss = require("gulp-uglifycss");
//var streamify = require("gulp-streamify");
var rename = require("gulp-rename");
var processhtml = require("gulp-processhtml");
var gls = require("gulp-live-server");

///Process Sass files..
gulp.task("sass", function() {

  var _SourceFile = "./Sass/Main.scss";

  gulp.src(_SourceFile)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./Dev"));
});

gulp.task("mini-css", function() {

  var _SourceFile = "./Dev/Main.css";

  gulp.src(_SourceFile)
    .pipe(uglifyCss())
    .pipe(rename({
      basename : "Main",
      extname : ".min.css"
    }))
    .pipe(gulp.dest("./Build"));
});

///Process JS files..
gulp.task("js", function() {

  var _SourceFile = "./Scripts/MainPage.js";

  return browserify(_SourceFile)
    .bundle()
    .pipe(source("Main.js"))
    .pipe(gulp.dest("./Dev"));
});

gulp.task("mini-js",function () {

  var _Source = "./Dev/Main.js";

  gulp.src(_Source)
    .pipe(uglify())
    .pipe(rename({
      basename : "Main",
      extname : ".min.js"
    }))
    .pipe(gulp.dest("./Build"));
});

gulp.task("html", function() {
  var _SourceFile = "./Dev/index.html";

  gulp.src(_SourceFile)
    .pipe(processhtml())
    .pipe(gulp.dest("."));
});

gulp.task("server", function() {
  var server = gls.static("./Dev", 8888);
  server.start();

  var watcher = gulp.watch(["./Sass/*.scss", "./Scripts/*.js" , "./Dev/index.html"],["sass" , "js"]);
  watcher.on("change", function(file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task("build", ["sass", "js", "mini-css", "mini-js" , "html"]);
