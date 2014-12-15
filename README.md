## hawtio-core-navigation

A core plugin that provides the main navigation bar and an API to manipulate the navigation bar for the **[hawtio](http://hawt.io)** web console.

### Basic usage
* `bower install --save hawtio-core-navigation`

* In your hawtio plugin you can configure your routes and the navigation bar in one go:

```
  var tab = undefined;
  var module = angular.module("MyAwesomePlugin", []);

  // configure our tabs and routing
  module.config(['$routeProvider', 'HawtioNavBuilderProvider', function($routeProvider, builder) {
    tab = builder.create()
            .id("MyTab")
            .title(function () { return "Hello"; })
            .href(function () { return "/test1"l })
            .subPath("World!", "page1", "partials/page1.html")
            .build();
    builder.configureRouting($routeProvider, tab);
  }]);

  // add our tabs to the nav bar
  module.run(["HawtioNav", function(HawtioNav) {
    HawtioNav.add(tab);
  }]);

  hawtioPluginLoader.addModule("MyAwesomePlugin");
```

see index.html and hawtio-nav-example.js for more detail.
