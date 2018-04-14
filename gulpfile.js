var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
	return gulp.src('./src/assets/style/sass/index.scss')
		.pipe(concat('main.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./www/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./src/assets/style/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
