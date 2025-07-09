'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const mode = require('gulp-mode')({ modes: ['prod', 'dev'], default: 'dev', verbose: false });
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const cssmqpacker = require('css-mqpacker');
const panini = require('panini');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const del = require('gulp-clean');

let formats = {
    style: 'css', /* Теперь работаем с чистым CSS */
    images: '.{webp,jpg,jpeg,png,svg,gif,ico}',
    fonts: '.{woff,woff2}',
};

let basePaths = {
    src: './src',
    dist: './dist',
    assets: 'assets'
};

let paths = {
    build: {
        views: basePaths.dist,
        styles: `${basePaths.dist}/css`,
        scripts: `${basePaths.dist}/js`,
        images: `${basePaths.dist}/images`,
        fonts: `${basePaths.dist}/fonts`,
    },
    src: {
        views: `${basePaths.src}/*.html`,
        styles: [
            `${basePaths.src}/${basePaths.assets}/${formats.style}/_libs.${formats.style}`,
            `${basePaths.src}/${basePaths.assets}/${formats.style}/_vars.${formats.style}`,
            `${basePaths.src}/${basePaths.assets}/${formats.style}/components/*.${formats.style}`,
            `${basePaths.src}/${basePaths.assets}/${formats.style}/modules/*.${formats.style}`,
            `${basePaths.src}/${basePaths.assets}/${formats.style}/*.${formats.style}`
        ],
        scripts: `${basePaths.src}/${basePaths.assets}/js/*.js`,
        images: `${basePaths.src}/${basePaths.assets}/images/**/*${formats.images}`,
        fonts: `${basePaths.src}/${basePaths.assets}/fonts/**/*${formats.fonts}`,
    },
    watch: {
        views: `${basePaths.src}/**/*.html`,
        styles: `${basePaths.src}/${basePaths.assets}/**/*.${formats.style}`,
        scripts: `${basePaths.src}/${basePaths.assets}/**/*.js`,
        images: `${basePaths.src}/${basePaths.assets}/images/**/*${formats.images}`,
        fonts: `${basePaths.src}/${basePaths.assets}/fonts/**/*${formats.fonts}`,
    },
    clean: `${basePaths.dist}/*`,
};

function serve() {
    browserSync.init({
        server: {
            baseDir: basePaths.dist,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        },
        ghostMode: { clicks: false },
        notify: false,
        online: true,
        open: false,
        port: 3001,
        // tunnel: true
    })
}

function views() {
    panini.refresh();
    return src(paths.src.views)
        .pipe(plumber())
        .pipe(
            panini({
                root: basePaths.src,
                layouts: basePaths.src + '/layouts/',
                helpers: '/helpers/',
                data: '/data/',
            })
        )
        .pipe(dest(paths.build.views))
        .pipe(browserSync.stream());
}

function styles() {
    let postPlugins = [
        postcssImport(),
        autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 5 version', 'not dead'],
            cascade: true
        }),
        cssmqpacker({ sort: true }),
        cssnano({ preset: ['default', { discardComments: { removeAll: true } }] }),
    ];
    return src(paths.src.styles)
        .pipe(mode.dev(sourcemaps.init()))
        .pipe(mode.dev(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'CSS Error',
                    message: 'Error <%= error.message %>'
                })(err);
                this.emit('end');
            },
        })))
        .pipe(concat('styles.css'))
        .pipe(postcss(postPlugins))
        .pipe(rename({ basename: 'style', suffix: '.min' }))
        .pipe(mode.dev(sourcemaps.write('./maps/')))

        .pipe(dest(paths.build.styles))
        .pipe(browserSync.stream());
}

function scripts() {
    const webpackConfig = require('./webpack.conf');
    return src(paths.src.scripts)
        .pipe(mode.dev(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'JS Error',
                    message: 'Error <%= error.message %>'
                })(err);
                this.emit('end');
            },
        })))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest(paths.build.scripts))
        .pipe(browserSync.stream());
}

function images() {
    return src(paths.src.images, { encoding: false, buffer: false })
        .pipe(dest(paths.build.images))
        .pipe(browserSync.stream());
}

function fonts() {
    return src(paths.src.fonts, { encoding: false, buffer: false })
        .pipe(dest(paths.build.fonts))
        .pipe(browserSync.stream());
}

function clean() {
    if (fs.existsSync(basePaths.dist)) {
        return src(paths.clean, { allowEmpty: true })
            .pipe(del({ force: true }));
    }
    return Promise.resolve();
}

function watching() {
    watch([paths.watch.views], views);
    watch([paths.watch.styles], styles);
    watch([paths.watch.scripts], scripts);
    watch([paths.watch.images], images);
    watch([paths.watch.fonts], fonts);
}

let build = series(clean, parallel(views, styles, scripts, images, fonts));
let run = parallel(build, watching, serve);

exports.views = views;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;

exports.build = build; /* gulp build --prod */
exports.default = run; /* gulp --dev */
