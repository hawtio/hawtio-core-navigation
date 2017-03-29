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
      // bower:js
      'libs/angular/angular.js',
      'libs/angular-route/angular-route.js',
      'libs/jquery/dist/jquery.js',
      'libs/angular-sanitize/angular-sanitize.js',
      'libs/js-logger/src/logger.js',
      'libs/hawtio-core/dist/hawtio-core.js',
      'libs/urijs/src/URI.js',
      'libs/angular-animate/angular-animate.js',
      'libs/angular-bootstrap/ui-bootstrap-tpls.js',
      'libs/jquery-ui/jquery-ui.js',
      'libs/angular-dragdrop/src/angular-dragdrop.js',
      'libs/datatables.net/js/jquery.dataTables.js',
      'libs/angular-datatables/dist/angular-datatables.js',
      'libs/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
      'libs/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.js',
      'libs/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js',
      'libs/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.js',
      'libs/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.js',
      'libs/angular-datatables/dist/plugins/fixedcolumns/angular-datatables.fixedcolumns.js',
      'libs/angular-datatables/dist/plugins/fixedheader/angular-datatables.fixedheader.js',
      'libs/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
      'libs/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.js',
      'libs/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
      'libs/angular-datatables/dist/plugins/select/angular-datatables.select.js',
      'libs/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      'libs/datatables.net-select/js/dataTables.select.js',
      'libs/lodash/lodash.js',
      'libs/bootstrap/dist/js/bootstrap.js',
      'libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
      'libs/bootstrap-select/dist/js/bootstrap-select.js',
      'libs/bootstrap-switch/dist/js/bootstrap-switch.js',
      'libs/bootstrap-touchspin/src/jquery.bootstrap-touchspin.js',
      'libs/d3/d3.js',
      'libs/c3/c3.js',
      'libs/datatables/media/js/jquery.dataTables.js',
      'libs/datatables-colreorder/js/dataTables.colReorder.js',
      'libs/datatables-colvis/js/dataTables.colVis.js',
      'libs/google-code-prettify/bin/prettify.min.js',
      'libs/matchHeight/dist/jquery.matchHeight.js',
      'libs/moment/moment.js',
      'libs/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'libs/patternfly-bootstrap-combobox/js/bootstrap-combobox.js',
      'libs/patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js',
      'libs/patternfly/dist/js/patternfly.js',
      'libs/angular-patternfly/dist/angular-patternfly.js',
      // endbower
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
