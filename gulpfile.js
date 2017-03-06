var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    karma = require('karma').server,
    del = require('del'),
    argv = require('yargs').argv,
    gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins({ lazy: false });

var config = {
  dist: argv.out || './dist/'
}

gulp.task('bower', function() {
  gulp.src('index.html')
    .pipe(wiredep({
    }))
    .pipe(gulp.dest('.'));
  gulp.src('karma.conf.js')
    .pipe(wiredep({
      exclude: 'libs/webcomponentsjs/webcomponents.js'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('templates', function() {
  return gulp.src(['./templates/**/*.html'])
    .pipe(plugins.angularTemplatecache({
      filename: 'templates.js',
      root: 'templates/',
      module: 'hawtio-nav'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('concat', ['templates'], function() {
  return gulp.src(['./src/hawtio-core-navigation.js', './templates.js'])
    .pipe(plugins.concat('hawtio-core-navigation.js'))
    .pipe(gulp.dest(config.dist));
});

// gulp.task('css', function() {
//   return gulp.src(['./src/hawtio-core-navigation.css'])
//     .pipe(gulp.dest(config.dist));
// });

gulp.task('clean', ['concat'], function() {
  return del('./templates.js');
});

gulp.task('example-templates', function() {
  return gulp.src('./test/html/*.html')
    .pipe(plugins.angularTemplatecache({
      filename: 'example-templates.js',
      root: 'test/html',
      module: 'test'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('example-concat', ['example-templates'], function() {
  return gulp.src(['./src/hawtio-nav-example.js', './example-templates.js'])
    .pipe(plugins.concat('hawtio-nav-example.js'))
    .pipe(gulp.dest(config.dist));
});

gulp.task('example-clean', ['example-concat'], function() {
  return del('./example-templates.js');
});

gulp.task('watch', ['build', 'build-example'], function() {
  plugins.watch(['src/hawtio-core-navigation.*', 'templates/**/*.html'], function() {
    gulp.start('build');
  });
  plugins.watch(['src/hawtio-nav-example.js', 'test/html/*.html'], function() {
    gulp.start('build-example');
  });
});

gulp.task('connect', function() {
  plugins.watch(['index.html', 'dist/hawtio-nav-example.js', 'dist/hawtio-core-navigation.js'], function() {
    gulp.start('reload');
  });
  plugins.connect.server({
    root: '.',
    livereload: true,
    port: 2772,
    fallback: 'index.html'
  });
});

gulp.task('test', function() {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  });
});

gulp.task('reload', function() {
  gulp.src('.')
    .pipe(plugins.connect.reload());
});

gulp.task('build', ['templates', 'concat', 'bower', 'clean']);
gulp.task('build-example', ['example-templates', 'example-concat', 'example-clean']);
gulp.task('default', ['build', 'build-example', 'watch', 'connect', 'test']);
