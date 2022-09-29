const { src, dest, watch, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));

const cache =require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif =require('gulp-avif');


function css(done) {

    src('src/scss/**/*.scss') //ideantificar archivo de sass 
    
    .pipe(sass()) //compilarlo
    
    .pipe(dest('build/css')) //almacenar en hd
    

    
    done();
    
}


function dev(done){

    watch('src/scss/**/*.scss',css)
    

    
    done()
    
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))

    done()
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done()
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done()
}
exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);