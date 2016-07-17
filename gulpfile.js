/**
 * gulp         => clean & build
 * gulp serve   => clean & build w/ watch & start server
 *
 * --production => minifies everything
 * --open       => opens browser when serving
 */

/* jshint node: true, strict: global */
'use strict';

var gulp = require('gulp'),
    minifyJs = require('gulp-minify'),
    stripDebug = require('gulp-strip-debug'),
    tsc = require('gulp-typescript'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    autoprefix  = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    reload = browserSync.reload,
    argv = require('yargs').argv,
    gulpif = require('gulp-if');

/**
 * Build directory
 */
var buildDir = './dist';

/**
 * Paths to files
 */
var paths = {
    input: {
        styles: ['./src/styles/**/*.scss'],
        scripts: ['./src/**/*.js'],
        ts: ['./src/app/**/*.ts', './typings/**/*.ts'],
        html: ['./src/**/*.html']
    },
    output: {
        css: buildDir + '/css',
        js: buildDir + '/app',
        html: buildDir,
        vendor: buildDir + '/vendor',
        root: buildDir
    }
};

/**
 * TypeScript options
 */
var tsOptions = {
    target: 'es5',
    module: 'commonjs',
    sortOutput: true,
    moduleResolution: 'node',
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: false
};

/**
 * JavaScript minify options
 */
var minifyOptions = {
    noSource: true,
    ext: {
        min: '.js'
    }
};

/**
 * HTML minify options
 */
var htmlMinifyOptions = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    caseSensitive: true
};

/**
 * Browser support for autoprefixer
 */
var autoprefixerOptions = {
    browsers: [
        'last 10 Chrome versions',
        'Firefox >= 23',
        'ie >= 9',
        'Safari >= 7'
    ]
};

/**
 * Compile source files
 */
gulp.task('build:src', ['transpile:styles', 'transpile:ts', 'copy:scripts', 'copy:html']);

/**
 * Transpile styles
 */
gulp.task('transpile:styles', function() {
    var outputStyle = (argv.production) ? 'compressed' : 'expanded';

    return gulp.src(paths.input.styles)
        .pipe(
            sass({
                errLogToConsole: true,
                outputStyle: outputStyle
            }).on('error', sass.logError)
        )
        .on('error', function(error) {
            browserSync.notify(error.message, 3000);
            this.emit('end');
        })
        .pipe(gulpif(argv.production, cleanCss()))
        .pipe(autoprefix(autoprefixerOptions))
        .pipe(gulp.dest(paths.output.css))
        .pipe(reload({stream:true}));
});

/**
 * Transpile scripts
 */
gulp.task('transpile:ts', function() {
    return gulp.src(paths.input.ts)
        .pipe(tsc(tsOptions))
        .on('error', function(error) {
            browserSync.notify(error.message, 3000);
            this.emit('end');
        })
        .pipe(gulpif(argv.production, minifyJs(minifyOptions)))
        .pipe(gulpif(argv.production, stripDebug()))
        .pipe(gulp.dest(paths.output.js))
        .pipe(reload({stream:true}));
});

/**
 * Copy scripts
 */
gulp.task('copy:scripts', function() {
    return gulp.src(paths.input.scripts)
        .pipe(gulpif(argv.production, minifyJs(minifyOptions)))
        .pipe(gulp.dest(paths.output.root))
        .pipe(reload({stream:true}));
});

/**
 * Minify html
 */
gulp.task('copy:html', function () {
    return gulp.src(paths.input.html)
        .pipe(gulpif(argv.production, htmlmin(htmlMinifyOptions)))
        .pipe(gulp.dest(paths.output.html))
        .pipe(reload({stream:true}));
});

/**
 * Copy required vendor files
 */
gulp.task('copy:vendor', ['copy:fonts', 'copy:libs']);

/**
 * Move fonts
 */
gulp.task('copy:fonts', function () {
    return gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest(buildDir +'/font'));
});

/**
 * Move required libraries
 */
gulp.task('copy:libs', function (callback) {
    gulp.src('./node_modules/core-js/client/shim.min.js')
        .pipe(gulp.dest(paths.output.vendor));
    gulp.src('./node_modules/zone.js/dist/zone.js')
        .pipe(gulp.dest(paths.output.vendor));
    gulp.src('./node_modules/reflect-metadata/Reflect.js')
        .pipe(gulp.dest(paths.output.vendor));
    gulp.src('./node_modules/systemjs/dist/system.src.js')
        .pipe(gulp.dest(paths.output.vendor));
    gulp.src('./node_modules/@angular/**/*.js')
        .pipe(gulp.dest(paths.output.vendor + '/@angular'));
    gulp.src('./node_modules/angular2-in-memory-web-api/**/*.js')
        .pipe(gulp.dest(paths.output.vendor + '/angular2-in-memory-web-api'));
    gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest(paths.output.vendor + '/rxjs'));
    callback();
});

/**
 * Watch task for compiling styles
 */
gulp.task('watch', ['build'], function() {
    gulp.watch(paths.input.styles, ['transpile:styles'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(paths.input.ts, ['transpile:ts'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(paths.input.scripts, ['copy:scripts'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(paths.input.html, ['copy:html'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

/**
 * Clean build
 */
gulp.task('clean', function () {
    return del(buildDir);
});

/**
 * Build app
 */
gulp.task('build', function (callback) {
    runSequence(
        'clean',
        'build:src',
        'copy:vendor',
        callback);
});

/**
 * Start a server
 */
gulp.task('serve', ['watch'], function () {
    var open = (argv.open) ? 'local' : false;

    browserSync.init({
        server: {
            baseDir: buildDir,
            middleware: [ historyApiFallback() ]
        },
        online: true,
        open: open
    });
});

/**
 * Compile styles and watch for changes
 */
gulp.task('default', ['build']);