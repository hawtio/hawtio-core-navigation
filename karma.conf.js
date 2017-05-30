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
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/js-logger/src/logger.js',
      'node_modules/@hawtio/core/dist/hawtio-core.js',
      'node_modules/urijs/src/URI.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/datatables.net/js/jquery.dataTables.js',
      'node_modules/angular-datatables/dist/angular-datatables.js',
      'node_modules/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
      'node_modules/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.js',
      'node_modules/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js',
      'node_modules/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.js',
      'node_modules/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.js',
      'node_modules/angular-datatables/dist/plugins/fixedcolumns/angular-datatables.fixedcolumns.js',
      'node_modules/angular-datatables/dist/plugins/fixedheader/angular-datatables.fixedheader.js',
      'node_modules/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
      'node_modules/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.js',
      'node_modules/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
      'node_modules/angular-datatables/dist/plugins/select/angular-datatables.select.js',
      'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      'node_modules/datatables.net-select/js/dataTables.select.js',
      'node_modules/lodash/lodash.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
      'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
      'node_modules/bootstrap-switch/dist/js/bootstrap-switch.js',
      'node_modules/bootstrap-touchspin/src/jquery.bootstrap-touchspin.js',
      'node_modules/d3/d3.js',
      'node_modules/c3/c3.js',
      'node_modules/datatables/media/js/jquery.dataTables.js',
      'node_modules/google-code-prettify/bin/prettify.min.js',
      'node_modules/moment/moment.js',
      'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'node_modules/patternfly-bootstrap-combobox/js/bootstrap-combobox.js',
      'node_modules/patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js',
      'node_modules/patternfly/dist/js/patternfly.js',
      'node_modules/angular-patternfly/dist/angular-patternfly.js',
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
