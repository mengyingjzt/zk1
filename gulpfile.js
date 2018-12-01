var gulp = require('gulp');
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
//编译sass
gulp.task("devSass", function() {
    return gulp.src("./src/scss/index.scss") //读文件
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css")) //输出文件

})

gulp.task("watch", function() {
    return gulp.watch("./src/scss/index.scss", gulp.series("devSass"));
})

//压缩js
gulp.task("buglify", function() {
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./src/minjs"))
})

// //开发环境
gulp.task('dev', gulp.series('devSass', 'buglify', 'watch'))