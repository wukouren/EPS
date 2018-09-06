'use strict';
let gulp = require('gulp');//引入gulp
let del = require('del');//引入删除文件
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let htmlmin = require('gulp-htmlmin');
let $ = require('gulp-load-plugins')();
let useref = require('gulp-useref');
let uglify = require('gulp-uglify');

let gutil = require('gulp-util');
let minifycss = require('gulp-minify-css');
let express = require('express');
let gulpif = require('gulp-if');
let router = express.Router();
let sprity = require('sprity');
let fz = 41.4;
gulp.task('styles:sass', () => {
  var sass = require('gulp-ruby-sass');
  sass(['src/scss/**/*.scss'], {
    style: 'expanded',
    precision: 10
  })
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('src/styles'))
    .pipe(gulp.dest('build/styles'))
    .pipe($.size({ title: 'build/styles' }));
});
gulp.task('styles', ['styles:sass']);
gulp.task('mini', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/images'));
})
gulp.task('concatRoutes', () => {
  var concat = require('gulp-concat');
  gulp.src(['routers/Test.js', 'routers/router/*.js', 'routers/b.js'])
    .pipe(concat('router.js'))
    .pipe(gulp.dest('routers'))
})

gulp.task('spriter', () => {
  const js_to_css = function (obj) {
    let _decode = [];
    let _css = "";
    for (n in obj) {
      _decode.push({ selector: n, styles: obj[n], number_of_objs: 0 })
    }
    while (_decode.length > 0) {
      var selector = _decode[0].selector;
      var styles = _decode[0].styles;
      _css += "\n\r" + selector + " {";
      for (var n in styles) {
        if (styles.hasOwnProperty(n)) {
          if (typeof styles[n] === "string") {
            _css += n + ": " + styles[n] + "; ";
          } else {
            const _index = _decode[0].number_of_objs + 1;
            _decode.splice(_index, 0, { selector: selector + " " + n, styles: styles[n], number_of_objs: 0 })
            _decode[0].number_of_objs++;
          }
        }
      }
      _css += "}  ";
      _decode.splice(0, 1);
    }
    return _css;
  }
  const spritesmith = require('gulp.spritesmith');
  const yaml = require('js-yaml');
  return gulp.src('src/images/icons/*.png')
    .pipe(spritesmith({
      imgName: 'src/images/sprite.png',  //保存合并后图片的地址
      cssName: 'src/scss/apps/sprite.scss',   //保存合并后对于css样式的地址
      padding: 20,
      algorithm: 'top-down',
      cssTemplate: function (data) {
        var spriteObj = {};
        data.sprites.forEach(function (sprite) {

          let newData = {
            "display": "inline-block",
            "background-image": 'url(' + sprite["escaped_image"] + ')',
            "background-position": ((sprite.px.offset_x.replace("px", '')) / 2 / fz + 'rem') + ' ' + ((parseInt(sprite.px.offset_y.replace("px", '')) + 1) / 2 / fz + 'rem'),
            "background-size": (sprite.total_width / 2 / fz + "rem"),
            "width": ((parseInt(sprite.px.width.replace("px", '')) + 1) / 2 / fz + 'rem'),
            "height": ((parseInt(sprite.px.height.replace("px", '')) + 2) / 2 / fz + 'rem')
          }
          var name = '.icon-' + sprite.name;
          // if(sprite.name == 'radio-normal'){
          // console.log(sprite.name,sprite.px)  
          // }
          spriteObj[name] = newData;
          delete sprite.name;
        });
        return js_to_css(spriteObj);
      }
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('copyotherfile', () => {
  return gulp.src('src/otherfile/*')
    .pipe(gulp.dest('build/otherfile/'));
})
gulp.task('public', ['copyotherfile', 'spriter', 'mini'], () => {
  return gulp.src('src/index.html')
    .pipe(useref({
      searchPath: ['src/styles', '.'],
      transformPath: function (filePath) {
        // console.log(arguments,'这个是啥呢');
        return filePath
      }
    }))
    .pipe(gulpif('*.css', minifycss()))
    .pipe(gulpif('*.js', uglify().on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })))
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
})
gulp.task('default', ["styles", 'concatRoutes'], function () {
  gulp.watch(['routers/router/*.js'], ['concatRoutes']);
  // gulp.watch(['src/public/*.html'],['html']);
  gulp.watch(['src/scss/**/*.scss'], ['styles:sass']);
});






