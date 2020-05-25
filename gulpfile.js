const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

function sassCompile() {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/styles"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function browserStart() {
  return browserSync.init({
    server: {
      baseDir: "public",
    },
  });
}

function fileWatchers() {
  gulp.watch("sass/**/*.scss", sassCompile);
  gulp.watch("public/*.html", browserSync.reload);
  gulp.watch("public/scripts/**/*.js", browserSync.reload);
}

gulp.task(
  "default",
  gulp.series(sassCompile, gulp.parallel(browserStart, fileWatchers))
);
