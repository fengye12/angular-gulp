var gulp = require('gulp');
var concat = require('gulp-concat'); //合并文件
var minifycss = require('gulp-minify-css'); //压缩css
var templateCache = require('gulp-angular-templatecache'); //压缩 ng模板
var uglify = require('gulp-uglify'); // 压缩 代码
var es = require('event-stream'); // 事件插件
var del = require("del"); //删除
var browserSync = require("browser-sync"); // 自动刷新
var chokidar = require('chokidar'); //监听
var reload = browserSync.reload;

//压缩依赖的js代码
gulp.task('libScripts', function() {
	var scriptsGlob = ['app/lib/jQuery/*.js',
		'app/lib/bootstrap/*.js',
		'app/lib/angular/angular.min.js',
		'app/lib/**/*.js'
	];
	return gulp.src(scriptsGlob)
                        .pipe(concat('lib.js'))
                        .pipe(gulp.dest('app/js')) //输出到指定目录
		.pipe(uglify()) //压缩 js代码
		.pipe(concat('lib.min.js')) // 拼接成 一个js
                        .pipe(gulp.dest('dist/js')) //输出到指定目录
                        .pipe(reload({stream: true}));
});
//压缩ng代码
gulp.task('ngScripts', function() {
	var scriptsGlob = [
		//'!app/lib/**/*.js',
		'app/scripts/app.js',
		'app/components/**/*.js'
	];
	var tpl = gulp.src('app/**/*.html')
		.pipe(templateCache());

	/*return gulp.src(scriptsGlob)
		.pipe(uglify()) //压缩 js代码
		.pipe(concat('business.min.js')) // 拼接成 一个js
		.pipe(gulp.dest('dist/js')) //输出到指定目录*/
	return es.merge(es.merge(
				gulp.src(scriptsGlob),
				tpl
			)
//			.pipe(uglify())
//			.pipe(concat('business.min.js'))
			.pipe(concat('business.js')))
                                        .pipe(gulp.dest('app/js'))
		              .pipe(gulp.dest('dist/js'))
                                        .pipe(reload({stream: true}));
});
//输出HTML
gulp.task("distHtml",function(){
    return gulp.src("app/index.html")
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});
//压缩css
gulp.task('minifyCss', function() {
	var cssSrc = [
		'app/css/bootstrap/**/*.css',
		'app/css/Font-Awesome/**/*.css',
		'app/css/system.css',
		'app/css/**/*.css'
	];
	return gulp.src(cssSrc) //压缩的文件
		.pipe(minifycss()) //执行压缩
                         .pipe(concat('all.min.css')) // 拼接成 一个js
                         .pipe(gulp.dest('app/css'))//输出到指定目录
		.pipe(gulp.dest('dist/css')) //输出到指定目录
                        .pipe(reload({stream: true}));
});
//清空 输出
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});
//gulp运行的时候
gulp.task("default", ['init']);
gulp.task('watch',['watch:css','watch:ng','watch:html']);
gulp.task("init", ['libScripts','distHtml', 'ngScripts', 'minifyCss']);

gulp.task('browser-sync', ["init","watch"], function() {
    browserSync.init({
        server: {
            baseDir: ["app"]
        },
        middleware: [function(req, res, next) {
            next();
        }],
        port: 80
    });
});

//监听css
gulp.task("watch:css", function() {
    var cssSrc = [
		'app/css/bootstrap/**/*.css',
		'app/css/Font-Awesome/**/*.css',
		'app/css/system.css',
		'app/css/**/*.css'
	];
	gulp.watch(cssSrc,['minifyCss'], browserSync.reload);
});
//监听js和html模板
gulp.task("watch:ng", function() {
    var jsSrc = [
		'!app/lib/**/*.js',
		'app/scripts/app.js',
		'app/**/*.js'
	];
	var tplSrc = 'app/**/*.html';
    gulp.watch(jsSrc,['ngScripts'], browserSync.reload);
    gulp.watch(tplSrc,['ngScripts'], browserSync.reload);
});
//监听html
gulp.task("watch:html", function() {
    var htmlSrc = ['app/index.html'];
    gulp.watch(htmlSrc,['distHtml'], browserSync.reload);
});

process.on('uncaughtException', function(e){console.log(e.stack)})