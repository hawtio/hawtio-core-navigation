
var Test;
(function (Test) {
    // simple test plugin for messing with the nav bar
    Test.pluginName = 'test';
    Test.templatePath = 'test/html';
    Test.log = Logger.get(Test.pluginName);
    Test._module = angular.module(Test.pluginName, []);
    var tab = null;
    var tab2 = null;
    var tabs = [];
    Test._module.config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function ($routeProvider, builder, $locationProvider) {
        $locationProvider.html5Mode(true);
        tab = builder.create()
                     .id(Test.pluginName)
                     .title(function () { return "Test"; })
                     .href(function () { return "/test1"; })
                     .subPath("Sub Page 1", "page1", builder.join(Test.templatePath, 'page1.html'))
                     .subPath("Sub Page 2", "page2", builder.join(Test.templatePath, 'page2.html'))
                     .subPath("Sub Page 3", "page3", builder.join(Test.templatePath, 'page3.html'))
                     .build();

        tab2 = builder.create()
                      .id(builder.join(Test.pluginName, '2'))
                      .title(function () { return "Test2"; })
                      .href(function () { return "/test2"; })
                      .page(function () { return builder.join(Test.templatePath, 'page1.html'); })
                      .build();

        ['1', '2', '3', '4'].forEach(function(index) {
          tabs.push(builder.create()
                           .id(builder.join('test', index))
                           .title( function() { return 'Test ' + index; })
                           .href( function() { return '/many/' + index; })
                           .build());
        });

        console.log("Tabs:", tabs);


        builder.configureRouting($routeProvider, tab);
        builder.configureRouting($routeProvider, tab2);
        $routeProvider.when('/many/:index', { templateUrl: builder.join(Test.templatePath, 'page1.html') });

        // Manually configured route
        $routeProvider.when('/foo', { redirectTo: '/foo/bar' });
        $routeProvider.when('/foo/bar', { templateUrl: builder.join(Test.templatePath, 'page1.html') });
        $routeProvider.when('/foo/barBaz', { templateUrl: builder.join(Test.templatePath, 'page2.html') });
    }]);
    Test._module.run(["viewRegistry", "HawtioNav", function (viewRegistry, HawtioNav) {

      viewRegistry['foo'] = 'templates/main-nav/layoutTest.html';
      Test.log.debug('loaded');
      tab.tabs.push({
        id: 'test',
        title: function() { return 'you should not see me!'; },
        href: function() { return '/foo'; },
        isValid: function() { return true; },
        show: function() { return false; }
      });
      tab.defaultPage = {
        rank: 10,
        isValid: function(yes, no) {
          setTimeout(function() {
            yes();
          }, 50);
        }
      };
      tab2.defaultPage = {
        rank: 20,
        isValid: function(yes, no) {
          setTimeout(function() {
            yes();
          }, 5000);
        }
      };
      HawtioNav.add(tab);
      HawtioNav.add(tab2);
      tabs.forEach(function(tab) { HawtioNav.add(tab); });
      var builder = HawtioNav.builder();
      var subTab1 = builder.id('fooSubTab')
                          .href(function() { return '/foo/bar'; })
                          .title(function() { return 'My Sub Tab 2'; })
                          .show(function () { return true; })
                          .build();
      var subTab2 = builder.id('fooSubTab')
                          .href(function() { return '/foo/barBaz'; })
                          .title(function() { return 'My Sub Tab 2'; })
                          .build();
      var tab3 = builder.id('foo')
                        .defaultPage({
                          rank: 40,
                          isValid: function(yes, no) {
                            setTimeout(function() {
                              no();
                            }, 50);
                          }
                        })
                        .href(function() { return '/foo'; })
                        .title(function() { return 'My Tab'; })
                        .tabs(subTab1, subTab2)
                        .build();
      HawtioNav.add(tab3);
    }]);
    hawtioPluginLoader.addModule(Test.pluginName);
})(Test || (Test = {}));

angular.module("test").run(["$templateCache", function($templateCache) {$templateCache.put("test/html/page1.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h1>Page 1</h1>\n    <p>foo</p>\n  </div>\n</div>\n");
$templateCache.put("test/html/page2.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h1>Page 2</h1>\n  </div>\n</div>\n");
$templateCache.put("test/html/page3.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h1>Page 3</h1>\n  </div>\n</div>\n");}]);