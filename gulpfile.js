const gulp = require("gulp");
const sass = require("gulp-sass");

function sassCompile() {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/styles"));
}

gulp.task("sass", sassCompile);

gulp.task("watch", function () {
  gulp.watch("sass/**/*.scss", sassCompile);
});
