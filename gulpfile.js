var     gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		del           = require('del'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
		fileinclude   = require('gulp-file-include');
		cache 		  = require('gulp-cache');
		imagemin 	  = require('gulp-imagemin');
		imageminPngquant = require('imagemin-pngquant');
		imageminZopfli 	 = require('imagemin-zopfli');
		imageminMozjpeg  = require('imagemin-mozjpeg');
		imageminGiflossy = require('imagemin-giflossy');		

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// 1. Gulp File Include
 
gulp.task('fileinclude', function() {
gulp.src(['app/html/*.html'])
	.pipe(fileinclude({
	prefix: '@@',
	basepath: '@file'
	}))
	.pipe(gulp.dest('app/'));
});


// 2. Minify and copy new styles to dist

gulp.task('styles', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});


// 3. Minify and copy new js files to dist

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/owl.carousel/dist/owl.carousel.min.js',
		'app/libs/isotope-layout/dist/isotope.pkgd.min.js',
		'app/libs/imagesloaded/imagesloaded.pkgd.min.js',
		'app/js/burger-menu.min.js',
		'app/libs/lightgallery/dist/js/lightgallery-all.min.js',
		'app/libs/lightgallery/lib/jquery.mousewheel.min.js',
		'app/js/common.js', // Always at the end	
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', ['styles', 'js', 'image', 'fileinclude', 'browser-sync'], function() {
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/img/**/*', ['image']);
	gulp.watch('app/html/**/*.html', ['fileinclude', browserSync.reload])
});

// 4. Minify and copy new images to dist

gulp.task('image', function() {
	return gulp.src(['app/img/**/*.{gif,png,jpg}'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
	.pipe(imagemin([

		// jpg lossless
		imagemin.jpegtran({
			progressive: true
		}),

		//jpg very light lossy, use vs jpegtran
		imageminMozjpeg({
			quality: 90
		}),

		// svg
		imagemin.svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: false}
			]
		}),

		// png
		imagemin.optipng({
			optimizationLevel: 5
		}),
		imageminPngquant({
			speed: 1,
			quality: 98 //lossy settings
		}),		
		imageminZopfli({
			more: true
			// iterations: 50 // very slow but more effective
		}),	

		// gif
		imagemin.gifsicle({
			interlaced: true
		}),
		// imagemin.gifsicle({
		//     interlaced: true,
		//     optimizationLevel: 3
		// }),

		//gif very light lossy, use only one of gifsicle or Giflossy
		imageminGiflossy({
			optimizationLevel: 3,
			optimize: 3, //keep-empty: Preserve empty transparent frames
			lossy: 2
		}),		
	]))
});

// 5. Dist directory clean
gulp.task('clean', function() {
    return del.sync('dist');
});


// 6. Build project Dist directory
gulp.task('build', ['clean', 'styles', 'image', 'js'], function() {

    var buildCss = gulp.src([
        'app/css/main.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
		
	var buildImages = gulp.src('app/img/**/*')
		.pipe(gulp.dest('dist/img'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);
