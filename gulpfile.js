var gulp = require('gulp');
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");

var babel = require("gulp-babel");
var server = require("gulp-webserver");
var url = require("url");
var fs = require("fs");
var path = require("path");
var swiper = require("./mock/swiper.json");
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


//起服务
gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname)
                if (pathname === "/favicon.ico") {
                    res.end("");
                    return
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify({ code: 1, data: swiper }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})

// //开发环境
gulp.task('dev', gulp.series('devSass', 'server', 'watch'))

//线上环境
gulp.task("bCss", function() {
        return gulp.src("./src/css/*.css")
            .pipe(gulp.dest('./build/css'))
    })
    //压缩js
gulp.task("buglify", function() {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"))
})

gulp.task("bHtml", function() {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./build"))
})