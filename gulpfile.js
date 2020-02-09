// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
var gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create(),
reload = browserSync.reload;
/*
//const cssnano = require('cssnano');
var replace = require('gulp-replace');*/


// File paths
const files = { 
    scssPath: 'sass/style.scss',
    jsPath: 'js/*.js'
}
function cssBuild() {
    return gulp
        .src('css/style.css')
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest('./minify/css'));
}
// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass({
            outputStyle: 'compressed'
          }).on('error', sass.logError)) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer() ])) // PostCSS plugins , cssnano()
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('./css')) // put final CSS in dist folder
        .pipe(browserSync.stream());
}
function imgMin(){
        return  src('./images/*')
        .pipe(imagemin())
        .pipe(dest('./minify/img'));
  
}
// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath ,'!' + './js/jquery-2.1.4.min.js', // to exclude any specific files
        files.jsPath ,'!' + './js/custom.js',
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('minify/js')
    );
}


// Cachebust
// var cbString = new Date().getTime();
// function cacheBustTask(){
//     return src(['index.html'])
//         .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//         .pipe(dest('.'));
// }

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously ,files.jsPath
function watchTask(){
    watch([files.scssPath], 
        series( parallel(scssTask)
           // cacheBustTask, jsTask
        )
    );    
}

 function browserWatch() {
     // Run serveSass function when starting the dev server to make sure the SCSS & dev CSS are the same
     scssTask();
  
    bs.init({
      // Dev server will run at localhost:8080
      port: 8080,
      server: {
        // I'm using 'src' as my base directory
        baseDir: '/',
      },
    });
	   browserSync.init({
        server: {
           baseDir: "./",
           index: "/index.html"
        }
    });
  
     // These watch for changes to files and reload in the browser
     watch('index.html').on('change', browserSync.reload);
     watch(scssPath, scssTask);
	 watch('./css/style.css').on('change',browserSync.reload);
	 
     
	 
   }
// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task cacheBustTask, , jsTask, watchTask  imgMin, cssBuild
exports.default = series( parallel(scssTask,imgMin),watchTask);

//exports.browserWatch = browserWatch;