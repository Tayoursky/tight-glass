var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var typographic = require('typographic');
var nib         = require('nib');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync')
var reload      = browserSync.reload;


gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./dev"
    });

    
  gulp.watch('dev/styl/**/*.styl', ['styles']);
});


gulp.task('styles', function(){
	gulp.src('dev/styl/main.styl')
		.pipe(stylus({
			use:[typographic(), nib()]
		}))
		.pipe(gulp.dest('dev/assets/css'))
    .pipe(browserSync.stream())
		.pipe(reload({stream:true}));

});
gulp.task('cssmin', function () {
    gulp.src('dev/assets/css/main.css')
        .pipe(cssmin())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/assets/css'));
});
gulp.task('htmlmin', function() {
     gulp.src('dev/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build'));
});
// билдинг яваскрипта
gulp.task('jsmin', function () {
    gulp.src('dev/js/main.js') //Найдем наш main файл
        //.pipe(rigger()) //Прогоним через rigger
        //.pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        //.pipe(sourcemaps.write()) //Пропишем карты
        //.pipe(rename({suffix: '.min'})) //добавим суффикс .min к выходному файлу
        .pipe(gulp.dest('build/assets/js')); //выгрузим готовый файл в build
        //.pipe(connect.reload()) //И перезагрузим сервер
});

gulp.task('html', function(){
  gulp.src('dev/index.html')
  .pipe(reload({stream:true}));
});
gulp.task('js', function(){
  gulp.src('dev/js/*.js')
  .pipe(reload({stream:true}));
});
/*
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});*/

gulp.task('watch', function(){
  gulp.watch('build/index.html', ['htmlmin'])
  gulp.watch('dev/js/*.js', ['js'])
  gulp.watch('dev/index.html', ['html']);
});
gulp.task('default', ['serve','watch']);//, 'browserSync'
gulp.task('build', ['cssmin','htmlmin','jsmin']);//, build

