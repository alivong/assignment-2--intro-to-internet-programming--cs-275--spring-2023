const {src, dest, watch, series} = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let lintCSS = () => {
    return src(`styles/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

let compressJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        server: {
            baseDir: [`.`]
        }
    });

    watch(`styles/*.css`)
        .on(`change`, reload);

    watch(`js/*.js`)
        .on(`change`, reload);
};

let copyUnprocessedAssestsforDev = () => {
    return src([
        `index.html`,
        `img/*.*`,
        `json/*.json`
    ], {dot: true})
        .pipe(dest(`temp`));
};

let copyUnprocessedAssestsforProd = () => {
    return src([
        `img/*.*`,
        `json/*.json`
    ], {dot: true})
        .pipe(dest(`prod`));
};

exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.transpileJS = transpileJS;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.serve = serve;
exports.copyUnprocessedAssestsforDev;
exports.copyUnprocessedAssestsforProd;
exports.default = series (
    lintCSS,
    lintJS,
    transpileJS,
    copyUnprocessedAssestsforDev,
    serve
);
exports.build = series (
    compressHTML,
    compressCSS,
    compressJS,
    copyUnprocessedAssestsforProd
);
