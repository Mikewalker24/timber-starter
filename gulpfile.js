/* eslint-disable */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var babel = require('gulp-babel');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var imageMin = require('gulp-imagemin');
var postCSS = require('gulp-postcss');
var cssnano = require('cssnano');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var mqpacker = require('css-mqpacker');
var sortCSSmq = require('sort-css-media-queries');

var config = {
	path: {
		domain: 'timber-starter.local',
		views: './views',
		styles: './assets/sass',
		js: './assets/js',
		img: './assets/img',
		dist: './assets/dist',
	},
	browsers: [
		'last 2 versions',
		'>1%',
		'safari 5',
		'ie 8',
		'ie 9',
		'opera 12.1',
	],
};

gulp.task('bs', function () {
	browserSync.init({
		proxy: config.path.domain,
	});
});

gulp.task('styles', function () {
	var plugins = [
		autoprefixer({
			browsers: config.browsers,
		}),
		cssnano(),
		mqpacker({
			sort: sortCSSmq.desktopFirst
		}),
	];
	return gulp
		.src(config.path.styles)
		.pipe(
			plumber({
				errorHandler: notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postCSS(plugins))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.path.dist))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('scripts', function () {
	return gulp
		.src(`${config.path.scripts}/scripts.js`)
		.pipe(
			plumber({
				errorHandler: notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(
			babel({
				presets: [
					[
						'env',
					],
				],
			})
		)
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.path.dist))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('images', function () {
	return gulp
		.src(`${config.path.img}/**/*`)
		.pipe(imageMin({
			progressive: true,
			optimizationLevel: 3, // 0-7 low-high
			interlaced: true,
		}))
		.pipe(gulp.dest(config.path.img));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
	gulp.watch(`${config.path.styles}/**/*.scss`, ['styles']);
	gulp.watch(`${config.path.scripts}/**/*.js`, ['scripts']);
	gulp.watch('./**/*.php', reload);
	gulp.watch(`${config.path.views}/**/*.twig`, reload);
});

// run `gulp` to kickoff all tasks and watch for changes
gulp.task('default', ['styles', 'scripts', 'images', 'bs', 'watch']);