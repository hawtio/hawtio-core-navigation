// Karma configuration
// Generated on Thu Dec 04 2014 12:51:15 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly.min.js',
      'node_modules/angular-patternfly/dist/angular-patternfly.min.js',
      'node_modules/angular-patternfly/node_modules/datatables.net/js/jquery.dataTables.js',
      'node_modules/angular-patternfly/node_modules/datatables.net-select/js/dataTables.select.js',
      'node_modules/angular-patternfly/node_modules/angular-datatables/dist/angular-datatables.js',
      'node_modules/angular-patternfly/node_modules/angular-datatables/dist/plugins/select/angular-datatables.select.js',
      'node_modules/angular-patternfly/node_modules/patternfly/node_modules/c3/c3.min.js',
      'node_modules/angular-patternfly/node_modules/patternfly/node_modules/d3/d3.min.js',
      'node_modules/lodash/lodash.min.js',
      'node_modules/urijs/src/URI.min.js',
      'node_modules/js-logger/src/logger.min.js',
      'node_modules/@hawtio/core/dist/hawtio-core.js',
      'dist/hawtio-core-navigation.js',
      'test/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
