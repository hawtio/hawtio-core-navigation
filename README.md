# DEPRECATED

**This project has been moved to [hawtio-core](https://github.com/hawtio/hawtio-core)**

# hawtio-core-navigation

A core plugin that provides the main navigation bar and an API to manipulate the navigation bar for the **[hawtio](http://hawt.io)** web console.

[![Circle CI](https://circleci.com/gh/hawtio/hawtio-core-navigation.svg?style=svg)](https://circleci.com/gh/hawtio/hawtio-core-navigation)

## Installation

```
yarn add @hawtio/core-navigation
```

## Set up development environment

### Clone the repository

```
git clone https://github.com/hawtio/hawtio-core-navigation
cd hawtio-core-navigation
```

### Install development tools

* [Node.js](http://nodejs.org)
* [Yarn](https://yarnpkg.com)
* [gulp](http://gulpjs.com/)

### Install project dependencies

```
yarn install:dev
```

### Run the web application

```
gulp
```

### Change the default proxy port

To proxy to a local JVM running on a different port than `8282` specify the `--port` CLI arguement to gulp:
```
gulp --port=8181
```

## Usage

In your hawtio plugin you can configure your routes and the navigation bar in one go:

```javascript
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

You can also configure your routes separately for more control and configure the tabs in your module's run method:

```javascript
  var module = angular.module("MyAwesomePlugin", []);
  // configure routing...
  module.config(['$routeProvider', function($routeProvider) {
    /// snip
  }]);

  module.run(["HawtioNav", function(HawtioNav) {
    // get a builder object to create nav objects
    var builder = HawtioNav.builder();

    // Create a subtab
    var subTab = builder.id('fooSubTab')
                        .rank(30)
                        .href(function() { return '/foo/bar'; })
                        .title(function() { return 'My Sub Tab'; })
                        .build();

    // Create a top-level tab
    var tab = builder.id('foo')
                     .rank(10)
                     .href(function() { return '/foo'; })
                     .isValid(function() { return true; })
                     .title(function() { return 'My Tab'; })
                     .tabs(subTab);
                     .build();

    // Add to the nav bar
    HawtioNav.add(tab);
  }]);
```

Tabs can also influence what the initial page/route will be by adding a 'defaultPage' attribute, for example:

```javascript
  var module = angular.module("MyAwesomePlugin", []);
  // configure routing...
  module.config(['$routeProvider', function($routeProvider) {
    /// snip
  }]);

  module.run(["HawtioNav", function(HawtioNav) {
    // get a builder object to create nav objects
    var builder = HawtioNav.builder();

    // Create a subtab
    var subTab = builder.id('fooSubTab')
                        .href(function() { return '/foo/bar'; })
                        .title(function() { return 'My Sub Tab'; })
                        .build();

    // Create a top-level tab
    var tab = builder.id('foo')
                     .defaultPage({
                       rank: 30, // rank is used to handle multiple default pages, higher values win
                       isValid: (yes, no) => { // isValid is used to test if a page can be the default page or not.  You need to call either the yes or no function passed in based on some criteria, can be async.
                         if (someKindOfTest) {
                           yes();
                         } else {
                           no();
                         }
                       }
                     })
                     .href(function() { return '/foo'; })
                     .isValid(function() { return true; })
                     .title(function() { return 'My Tab'; })
                     .tabs(subTab);
                     .build();

    // Add to the nav bar
    HawtioNav.add(tab);
  }]);
```

See [index.html](https://github.com/hawtio/hawtio-core-navigation/blob/master/index.html) and [hawtio-nav-example.js](https://github.com/hawtio/hawtio-core-navigation/blob/master/src/hawtio-nav-example.js) for more details and examples.
