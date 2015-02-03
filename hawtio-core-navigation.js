// Polyfill custom event if necessary since we kinda need it
(function () {
  if (!window.CustomEvent) {
    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
})();


var HawtioMainNav;
(function(HawtioMainNav) {

  HawtioMainNav.pluginName = 'hawtio-nav';
  var log = Logger.get(HawtioMainNav.pluginName);

  // Actions class with some pre-defined actions 
  var Actions = (function() {
    function Actions() {}
    Object.defineProperty(Actions, "ADD", {
      get: function() {
        return 'hawtio-main-nav-add';
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Actions, "REMOVE", {
      get: function() {
        return 'hawtio-main-nav-remove';
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Actions, "CHANGED", {
      get: function() {
        return 'hawtio-main-nav-change';
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Actions, "REDRAW", {
      get: function() {
        return 'hawtio-main-nav-redraw';
      },
      enumerable: true,
      configurable: true
    });
    return Actions;
  })();
  HawtioMainNav.Actions = Actions;

  // Class RegistryImpl
  var RegistryImpl = (function() {
    function RegistryImpl(root) {
      this.items = [];
      this.root = root;
      /*
         this.on(HawtioMainNav.Actions.ADD, 'log', function (item) {
         console.log('Adding item with id: ', item.id);
         });
         this.on(HawtioMainNav.Actions.REMOVE, 'log', function (item) {
         console.log('Removing item with id: ', item.id);
         });
         */
    }
    RegistryImpl.prototype.builder = function() {
      return new HawtioMainNav.NavItemBuilderImpl();
    };
    RegistryImpl.prototype.add = function(item) {
      var _this = this;
      var items = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
      }
      var toAdd = _.union([item], items);
      this.items = _.union(this.items, toAdd);
      toAdd.forEach(function(item) {
        _this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.ADD, {
          detail: {
            item: item
          }
        }));
      });
      this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.CHANGED, {
        detail: {
          items: this.items
        }
      }));
      this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.REDRAW, {
        detail: {}
      }));
    };
    RegistryImpl.prototype.remove = function(search) {
      var _this = this;
      var removed = _.remove(this.items, search);
      removed.forEach(function(item) {
        _this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.REMOVE, {
          detail: {
            item: item
          }
        }));
      });
      this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.CHANGED, {
        detail: {
          items: this.items
        }
      }));
      this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.REDRAW, {
        detail: {}
      }));
      return removed;
    };
    RegistryImpl.prototype.iterate = function(iterator) {
      this.items.forEach(iterator);
    };
    RegistryImpl.prototype.selected = function() {
      return _.find(this.items, function(item) {
        return item.isSelected && item.isSelected();
      });
    };
    RegistryImpl.prototype.on = function(action, key, fn) {
      var _this = this;
      switch (action) {
        case HawtioMainNav.Actions.ADD:
          this.root.addEventListener(HawtioMainNav.Actions.ADD, function(event) {
            //log.debug("event key: ", key, " event: ", event);
            fn(event.detail.item);
          });
          if (this.items.length > 0) {
            this.items.forEach(function(item) {
              _this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.ADD, {
                detail: {
                  item: item
                }
              }));
            });
          }
          break;
        case HawtioMainNav.Actions.REMOVE:
          this.root.addEventListener(HawtioMainNav.Actions.REMOVE, function(event) {
            //log.debug("event key: ", key, " event: ", event);
            fn(event.detail.item);
          });
          break;
        case HawtioMainNav.Actions.CHANGED:
          this.root.addEventListener(HawtioMainNav.Actions.CHANGED, function(event) {
            //log.debug("event key: ", key, " event: ", event);
            fn(event.detail.items);
          });
          if (this.items.length > 0) {
            this.root.dispatchEvent(new CustomEvent(HawtioMainNav.Actions.CHANGED, {
              detail: {
                items: _this.items
              }
            }));
          }
          break;
        case HawtioMainNav.Actions.REDRAW:
          this.root.addEventListener(HawtioMainNav.Actions.REDRAW, function(event) {
            //log.debug("event key: ", key, " event: ", event);
            fn(event);
          });
          var event = new CustomEvent(HawtioMainNav.Actions.REDRAW, {
            detail: {
              text: ''
            }
          });
          this.root.dispatchEvent(event);
          break;
        default:
      }
    };
    return RegistryImpl;
  })();

  // Factory for registry, used to create angular service
  function createRegistry(root) {
    return new RegistryImpl(root);
  }
  HawtioMainNav.createRegistry = createRegistry;

  // Class NavItemBuilderImpl
  var NavItemBuilderImpl = (function() {
    function NavItemBuilderImpl() {
      this.self = {
        id: ''
      };
    }
    NavItemBuilderImpl.join = function() {
      var paths = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i - 0] = arguments[_i];
      }
      var tmp = [];
      var length = paths.length - 1;
      paths.forEach(function (path, index) {
        if (!path || path === '') {
          return;
        }
        if (index !== 0 && path.charAt(0) === '/') {
          path = path.slice(1);
        }
        if (index !== length && path.charAt(path.length) === '/') {
          path = path.slice(0, path.length - 1);
        }
        if (path && path !== '') {
          tmp.push(path);
        }
      });
      var rc = tmp.join('/');
      return rc;
    };
    NavItemBuilderImpl.prototype.id = function(id) {
      this.self.id = id;
      return this;
    };
    NavItemBuilderImpl.prototype.title = function(title) {
      this.self.title = title;
      return this;
    };
    NavItemBuilderImpl.prototype.page = function(page) {
      this.self.page = page;
      return this;
    };
    NavItemBuilderImpl.prototype.reload = function(reload) {
      this.self.reload = reload;
      return this;
    };
    NavItemBuilderImpl.prototype.context = function(context) {
      this.self.context = context;
      return this;
    };
    NavItemBuilderImpl.prototype.href = function(href) {
      this.self.href = href;
      return this;
    };
    NavItemBuilderImpl.prototype.click = function(click) {
      this.self.click = click;
      return this;
    };
    NavItemBuilderImpl.prototype.isSelected = function(isSelected) {
      this.self.isSelected = isSelected;
      return this;
    };
    NavItemBuilderImpl.prototype.isValid = function(isValid) {
      this.self.isValid = isValid;
      return this;
    };
    NavItemBuilderImpl.prototype.show = function(show) {
      this.self.show = show;
      return this;
    };
    NavItemBuilderImpl.prototype.template = function(template) {
      this.self.template = template;
      return this;
    };
    NavItemBuilderImpl.prototype.tabs = function(item) {
      var items = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
      }
      this.self.tabs = _.union(this.self.tabs, [item], items);
      return this;
    };
    NavItemBuilderImpl.prototype.subPath = function(title, path, page, reload, isValid) {
      var parent = this.self;
      if (!this.self.tabs) {
        this.self.tabs = [];
      }
      var tab = {
        id: '',
        title: function() {
          return title;
        },
        href: function() {
          if (parent.href) {
            return NavItemBuilderImpl.join(parent.href(), path);
          }
          return path;
        }
      };
      if (!_.isUndefined(page)) {
        tab.page = function() {
          return page;
        };
      }
      if (!_.isUndefined(reload)) {
        tab.reload = reload;
      }
      if (!_.isUndefined(isValid)) {
        tab.isValid = isValid;
      }
      this.self.tabs.push(tab);
      return this;
    };
    NavItemBuilderImpl.prototype.build = function() {
      var answer = _.cloneDeep(this.self);
      this.self = {
        id: ''
      };
      return answer;
    };
    return NavItemBuilderImpl;
  })();
  HawtioMainNav.NavItemBuilderImpl = NavItemBuilderImpl;

  // Factory functions
  HawtioMainNav.createBuilder = function() {
    return new HawtioMainNav.NavItemBuilderImpl();
  };

  // Plugin initialization
  var _module = angular.module(HawtioMainNav.pluginName, []);
  HawtioMainNav._module = _module;

  _module.constant('layoutFull', 'templates/main-nav/layoutFull.html');

  _module.controller('HawtioNav.ViewController', ['$scope', '$route', '$location', 'layoutFull', 'viewRegistry', function($scope, $route, $location, layoutFull, viewRegistry) {

    findViewPartial();

    $scope.$on("$routeChangeSuccess", function (event, current, previous) {
      findViewPartial();
    });

    function searchRegistry(path) {
      var answer = undefined;
      _.forIn(viewRegistry, function (value, key) {
        if (!answer) {
          try {
            var reg = new RegExp(key, "");
            if (reg.exec(path)) {
              answer = value;
            }
          } catch (e) {
            log.debug("Invalid RegExp " + text + " for viewRegistry value: " + value);
          }
        }
      });
      return answer;
    }

    function findViewPartial() {
      var answer = null;
      var hash = $location.search();
      var tab = hash['tab'];
      if (angular.isString(tab)) {
        answer = searchRegistry(tab);
      }
      if (!answer) {
        var path = $location.path();
        if (path) {
          answer = searchRegistry(path);
        }
      }
      if (!answer) {
        answer = layoutFull;
      }
      $scope.viewPartial = answer;

      log.debug("Using view partial: " + answer);
      return answer;
    }
  }]);

  _module.run(['HawtioNav', '$rootScope', '$route', function(HawtioNav, $rootScope, $route) {
    HawtioNav.on(HawtioMainNav.Actions.CHANGED, "$apply", function(item) {
      if(!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    });
    HawtioNav.on(HawtioMainNav.Actions.ADD, "$apply", function(item) {
      var oldClick = item.click;
      item.click = function($event) {
        if (!($event instanceof jQuery.Event)) {
          try {
            $rootScope.$apply();
          } catch (e) {
            // ignore
          }
        }
        if (oldClick) {
          oldClick($event);
        }
      };
    });
    $route.reload();
    log.debug("loaded");
  }]);
  hawtioPluginLoader.addModule(HawtioMainNav.pluginName);
  hawtioPluginLoader.addModule("ngRoute");

  // helper function for testing nav items
  function itemIsValid(item) {
    if (!('isValid' in item)) {
      return true;
    }
    if (_.isFunction(item.isValid)) {
      return item.isValid();
    }
    return false;
  }

  function addIsSelected($location, item) {
    if (!('isSelected' in item) && 'href' in item) {
      item.isSelected = function() {
        return $location.path() === item.href() || $location.path().indexOf(item.href() + '/') === 0;
      };
    }
  }

  function drawNavItem($templateCache, $compile, scope, element, item) {
    if (!itemIsValid(item)) {
      return;
    }
    var newScope = scope.$new();
    newScope.item = item;
    var template = null;
    if (_.isFunction(item.template)) {
      template = item.template();
    } else {
      template = $templateCache.get('templates/main-nav/navItem.html');
    }
    element.append($compile(template)(newScope));
  }

  HawtioMainNav._module.directive('hawtioSubTabs', ['HawtioNav', '$templateCache', '$compile', '$location', '$rootScope', function(HawtioNav, $templateCache, $compile, $location, $rootScope) {
    return {
      restrict: 'A',
      controller: ['$scope', function($scope) {
        $scope.nav = HawtioNav;
        $scope.redraw = true;
        $scope.$watch('nav.selected()', function(selected, previous) {
          if (selected !== previous) {
            $scope.redraw = true;
          }
        });
        $scope.$on('hawtio-nav-redraw', function() {
          $scope.redraw = true;
        });
      }],
      link: function(scope, element, attrs) {
        scope.$watch('redraw', function(redraw) {
          element.empty();
          var selectedNav = HawtioNav.selected();
          if (selectedNav && selectedNav.tabs) {
            if (attrs['showHeading']) {
              var heading = angular.extend({}, selectedNav, {
                template: function() { return $templateCache.get('templates/main-nav/subTabHeader.html'); }});
                drawNavItem($templateCache, $compile, scope, element, heading);
            }
            selectedNav.tabs.forEach(function(item) {
              drawNavItem($templateCache, $compile, scope, element, item);
            });
          }
          scope.redraw = false;
        });
      }
    };
  }]);

  HawtioMainNav._module.directive("hawtioMainNav", ["HawtioNav", "$templateCache", "$compile", "$location", "$rootScope", function(HawtioNav, $templateCache, $compile, $location, $rootScope) {
    var config = {
      nav: {},
      numKeys: 0,
      numValid: 0
    };

    var iterationFunc = function(item) {
      if (itemIsValid(item)) {
        config.numValid = config.numValid + 1;
      }
    };

    HawtioNav.on(HawtioMainNav.Actions.ADD, 'isSelectedEnricher', function(item) {
      addIsSelected($location, item);
      if (item.tabs) {
        item.tabs.forEach(function(item) { addIsSelected($location, item); });
      }
    });
    HawtioNav.on(HawtioMainNav.Actions.ADD, 'PrimaryController', function(item) {
      config.nav[item.id] = item;
    });
    HawtioNav.on(HawtioMainNav.Actions.REMOVE, 'PrimaryController', function(item) {
      delete config.nav[item.id];
    });
    HawtioNav.on(HawtioMainNav.Actions.CHANGED, 'PrimaryController', function(items) {
      config.numKeys = items.length;
      config.numValid = 0;
      items.forEach(iterationFunc);
    });
    return {
      restrict: 'A',
      replace: false,
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $scope.config = config;
        $scope.redraw = true;
        $scope.$watch('config.numKeys', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.redraw = true;
          }
        });
        $scope.$watch('config.numValid', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.redraw = true;
          }
        });
        $scope.$on('hawtio-nav-redraw', function() {
          $scope.redraw = true;
        });
      }],
      link: function(scope, element, attr) {
        scope.$watch(function() {
          var oldValid = config.numValid;
          config.numValid = 0;
          HawtioNav.iterate(iterationFunc);
          if (config.numValid !== oldValid) {
            scope.redraw = true;
          }
          if (!scope.redraw) {
            // log.debug("not redrawing");
            config.numValid = 0;
            HawtioNav.iterate(iterationFunc);
          } else {
            // log.debug("redrawing");
            scope.redraw = false;
            element.empty();
            // first add any contextual menus (like perspectives)
            HawtioNav.iterate(function(item) {
              if (!('context' in item)) {
                return;
              }
              if (!item.context) {
                return;
              }
              drawNavItem($templateCache, $compile, scope, element, item);
            });
            // then add the rest of the nav items
            HawtioNav.iterate(function(item) {
              if (item.context) {
                return;
              }
              drawNavItem($templateCache, $compile, scope, element, item);
            });
          }
        });
      }
    };
  }]);

  // provider so it's possible to get a nav builder in _module.config()
  HawtioMainNav._module.provider('HawtioNavBuilder', [function HawtioNavBuilderProvider() {
    this.$get = function() {
      return {};
    };
    this.create = function() {
      return HawtioMainNav.createBuilder();
    };
    this.join = NavItemBuilderImpl.join;

    function setRoute($routeProvider, tab) {
      log.debug("Setting route: ", tab.href(), " to template URL: ", tab.page());
      var config = {
        templateUrl: tab.page()
      };
      if (!_.isUndefined(tab.reload)) {
        config.reloadOnSearch = tab.reload;
      }
      $routeProvider.when(tab.href(), config);
    }
    this.configureRouting = function($routeProvider, tab) {
      if (_.isUndefined(tab.page)) {
        if (tab.tabs) {
          var target = _.first(tab.tabs)['href'];
          if (target) {
            log.debug("Setting route: ", tab.href(), " to redirect to ", target());
            $routeProvider.when(tab.href(), {
              reloadOnSearch: tab.reload,
              redirectTo: target()
            });
          }
        }
      } else {
        setRoute($routeProvider, tab);
      }
      if (tab.tabs) {
        tab.tabs.forEach(function(tab) {
          return setRoute($routeProvider, tab);
        });
      }
    };
  }]);

  HawtioMainNav._module.factory('HawtioPerspective', [function() {
    var log = Logger.get('hawtio-dummy-perspective');
    return {
      add: function(id, perspective) {
        log.debug("add called for id: ", id);
      },
      remove: function(id) {
        log.debug("remove called for id: ", id);
        return undefined;
      },
      setCurrent: function(id) {
        log.debug("setCurrent called for id: ", id);
      },
      getCurrent: function(id) {
        log.debug("getCurrent called for id: ", id);
        return undefined;
      },
      getLabels: function() {
        return [];
      }
    };
  }]);

  HawtioMainNav._module.factory('HawtioNav', ['$window', '$rootScope', function($window, $rootScope) {
    var registry = HawtioMainNav.createRegistry(window);
    return registry;
  }]);

})(HawtioMainNav || (HawtioMainNav = {}));


