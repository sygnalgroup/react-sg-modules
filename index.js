function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var effects = require('redux-saga/effects');
var axios = _interopDefault(require('axios'));
var reactRedux = require('react-redux');
var React = require('react');
var React__default = _interopDefault(React);
var createSagaMiddleware = require('redux-saga');
var createSagaMiddleware__default = _interopDefault(createSagaMiddleware);
var redux = require('redux');
var reduxsauce = require('reduxsauce');
var Immutable = _interopDefault(require('seamless-immutable'));
var history$1 = require('history');
var reselect = require('reselect');
var humps = _interopDefault(require('humps'));
var ramda = require('ramda');

var ReducersProvider = React.createContext();

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function persistData(key, value) {
  if (value === 'batch-request') {
    return;
  }

  if (!localStorage) {
    console.warn('"window.localStorage" not found. Data will not be persisted.');
    return;
  }

  localStorage.setItem(key, value);
}
function retrieveData(key) {
  return localStorage && localStorage.getItem(key);
}
function removeData(key) {
  return localStorage && localStorage.removeItem(key);
}

var toSnackCase = function toSnackCase(value) {
  return value.replace(/[A-Z]/g, function (val) {
    return "_" + val.toLowerCase();
  }).replace(/^_/, '');
};
var setApiBaseUrl = function setApiBaseUrl(url) {
  persistData('SG_MODULE_BASE_URL_API', url);
};
var sgModule = function sgModule(moduleName, module) {
  var newModule = module;
  var newActions = module.actions;
  Object.keys(newActions).forEach(function (key) {
    newActions[key].module = moduleName;
    newActions[key].name = key;
  });
  newModule.actions = newActions;
  return newModule;
};

var modules;
var storeMiddlewares = [];
var connectRouter;
var authHeaders;

try {
  try {
    if (__dirname) {
      modules = require(__dirname + "/../../../../src/modules/index.js");
    } else {
      modules = require("../../../../src/modules/index.js");
    }
  } catch (_unused) {
    modules = require("../../../../src/modules/index.js");
  }

  storeMiddlewares = modules.storeMiddlewares || function () {
    return [];
  };

  connectRouter = modules.connectRouter || null;
  authHeaders = modules.authHeaders || null;
} catch (ex) {
  console.error('Error: Modules not found, please create a file with your modules in {PROJECT_ROOT}/src/modules/index.js ', ex);
  modules = {};
}
var appModules = modules["default"] || {};
Object.keys(appModules).forEach(function (key) {
  appModules[key] = sgModule(key, appModules[key]);
});
var Modules = modules["default"];

var actionsModules = {};
var actions = {};
Object.keys(Modules).forEach(function (module) {
  var actionsModule = Modules[module].actions;
  Object.keys(actionsModule).forEach(function (action) {
    actionsModules[action + "Start"] = actionsModule[action].action.start || ['params'];
    actionsModules[action + "Error"] = actionsModule[action].action.error;
    actionsModules[action + "Success"] = actionsModule[action].action.success;
  });
  actions[module] = reduxsauce.createActions(actionsModules, {
    prefix: module.toUpperCase() + "/"
  });
});

var reducers = {};
Object.keys(Modules).forEach(function (module) {
  var mapActionReducer = {};
  var moduleActions = Modules[module].actions;
  var moduleState = Modules[module].state;
  var Types = actions[module].Types;
  Object.keys(moduleActions).forEach(function (action) {
    var reducerActionStateStart = function reducerActionStateStart(state) {
      var _moduleActions$action;

      var newKeys = {};

      if ((_moduleActions$action = moduleActions[action].state) !== null && _moduleActions$action !== void 0 && _moduleActions$action.start) {
        Object.keys(moduleActions[action].state.start).forEach(function (param) {
          newKeys[param] = moduleActions[action].state.start[param];
        });
      }

      return state.merge(_extends({}, newKeys));
    };

    var reducerActionStateSuccess = function reducerActionStateSuccess(state, params) {
      var _moduleActions$action2, _moduleActions$action3;

      var newKeys = {};

      if ((_moduleActions$action2 = moduleActions[action].state) !== null && _moduleActions$action2 !== void 0 && _moduleActions$action2.success) {
        Object.keys(moduleActions[action].state.success).forEach(function (param) {
          newKeys[param] = moduleActions[action].state.success[param];
        });
      }

      if ((_moduleActions$action3 = moduleActions[action].action) !== null && _moduleActions$action3 !== void 0 && _moduleActions$action3.success) {
        moduleActions[action].action.success.forEach(function (param) {
          newKeys[param] = params[param];
        });
      }

      return state.merge(_extends({
        loading: false
      }, newKeys));
    };

    var reducerActionStateError = function reducerActionStateError(state, params) {
      var _moduleActions$action4, _moduleActions$action5;

      var newKeys = {};

      if ((_moduleActions$action4 = moduleActions[action].state) !== null && _moduleActions$action4 !== void 0 && _moduleActions$action4.error) {
        Object.keys(moduleActions[action].state.error).forEach(function (param) {
          newKeys[param] = moduleActions[action].state.error[param];
        });
      }

      if ((_moduleActions$action5 = moduleActions[action].action) !== null && _moduleActions$action5 !== void 0 && _moduleActions$action5.error) {
        moduleActions[action].action.error.forEach(function (param) {
          newKeys[param] = params[param];
        });
      }

      return state.merge(_extends({
        loading: false
      }, newKeys));
    };

    var actionName = toSnackCase(action);
    mapActionReducer[Types[actionName.toUpperCase() + "_START"]] = reducerActionStateStart;
    mapActionReducer[Types[actionName.toUpperCase() + "_SUCCESS"]] = reducerActionStateSuccess;
    mapActionReducer[Types[actionName.toUpperCase() + "_ERROR"]] = reducerActionStateError;
  });
  var INITIAL_STATE = Immutable(_extends({}, moduleState));
  reducers[module] = reduxsauce.createReducer(INITIAL_STATE, _extends({}, mapActionReducer));
});

var reducers$1 = function reducers$1(history) {
  if (!connectRouter) {
    return _extends({}, reducers);
  }

  return _extends({
    router: connectRouter(history)
  }, reducers);
};

var rootReducers = function rootReducers(history) {
  return redux.combineReducers(reducers$1(history));
};

var getAuthHeaders = function getAuthHeaders() {
  return authHeaders || ['uid', 'access-token', 'expiry', 'client'];
};
function retrieveAuthHeaders(retrieveData) {
  return function () {
    if (!retrieveData) {
      return null;
    }

    var headers = {};
    var headersKeys = getAuthHeaders();
    headersKeys.forEach(function (key) {
      headers[key] = retrieveData(key);
    });
    return headers;
  };
}
function persistAuthHeaders(persistData) {
  return function (headers) {
    if (!persistData || !headers) {
      return;
    }

    var headersKeys = getAuthHeaders();
    headersKeys.forEach(function (key) {
      persistData(key, headers[key]);
    });
  };
}
function clearAuthHeaders(removeData) {
  return function () {
    if (!removeData) {
      return;
    }

    var headersKeys = getAuthHeaders();
    headersKeys.forEach(function (key) {
      removeData(key);
    });
  };
}

var buildError = function buildError(response) {
  var statusCode = response ? response.status : null;
  var errors = response && response.data ? _extends({}, response.data.errors) : {};

  return {
    body: {
      errors: errors
    },
    statusCode: statusCode
  };
};

var getErrors = function getErrors(error) {
  return error && error.body && error.body.errors ? error.body.errors : {
    error: ['There was an error']
  };
};

var getErrorMessage = function getErrorMessage(error) {
  return Object.values(getErrors(error)).join('. ') || 'There was an error';
};

var sagas = [];
Object.keys(Modules).forEach(function (module) {
  var moduleActions = Modules[module].actions;
  var _actions$module = actions[module],
      Types = _actions$module.Types,
      Creators = _actions$module.Creators;
  Object.keys(moduleActions).forEach(function (action) {
    var _moduleActions$action;

    var _marked = /*#__PURE__*/regeneratorRuntime.mark(sagasFunction);

    var isTakeEvery = !!((_moduleActions$action = moduleActions[action]) !== null && _moduleActions$action !== void 0 && _moduleActions$action.isTakeEvery);

    function sagasFunction(_ref) {
      var _ref$params, params, data, options, resp;

      return regeneratorRuntime.wrap(function sagasFunction$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref$params = _ref.params, params = _ref$params === void 0 ? {} : _ref$params;
              data = params.data, options = params.options;

              if (!moduleActions[action].sagas) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return moduleActions[action].sagas(Creators, {
                params: data,
                options: options
              });

            case 5:
              return _context.abrupt("return");

            case 6:
              _context.prev = 6;
              resp = {
                data: null
              };

              if (!moduleActions[action].api) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return effects.call(moduleActions[action].api, data);

            case 11:
              resp = _context.sent;
              _context.next = 15;
              break;

            case 14:
              resp = params;

            case 15:
              _context.next = 17;
              return effects.put(Creators[action + "Success"](resp.data));

            case 17:
              if (options && options.onSuccess) {
                options.onSuccess(resp.data);
              }

              _context.next = 25;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](6);

              if (options && options.onError) {
                options.onError(getErrorMessage(_context.t0));
              }

              _context.next = 25;
              return effects.put(Creators[action + "Error"](getErrorMessage(_context.t0)));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _marked, null, [[6, 20]]);
    }

    var actionName = toSnackCase(action);

    if (isTakeEvery) {
      sagas.push(effects.takeEvery(Types[actionName.toUpperCase() + "_START"], sagasFunction));
    } else {
      sagas.push(effects.takeLatest(Types[actionName.toUpperCase() + "_START"], sagasFunction));
    }
  });
});

var _marked = /*#__PURE__*/regeneratorRuntime.mark(rootSaga);
function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return effects.all([].concat(sagas));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var history = history$1.createBrowserHistory();

var reducers$2 = rootReducers(history);
var middlewares = [];
var sagaMiddleware = createSagaMiddleware__default();
var composeEnhancers = process.env.REACT_APP_LOGGING_ENABLED ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose : redux.compose;
var storeAppMiddlewares = storeMiddlewares(history);

if (storeAppMiddlewares.length > 0) {
  storeAppMiddlewares.forEach(function (el) {
    middlewares.push(el);
  });
}

middlewares.push(sagaMiddleware);
var store = redux.createStore(reducers$2, composeEnhancers(redux.applyMiddleware.apply(void 0, middlewares)));
store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);

store.close = function () {
  return store.dispatch(createSagaMiddleware.END);
};

var selectors = {};
Object.keys(Modules).forEach(function (module) {
  var getState = function getState(state) {
    return state[module];
  };

  selectors[module] = {
    state: reselect.createSelector(getState, function (state) {
      return state;
    })
  };
});

var Provider = (function (_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/React__default.createElement(ReducersProvider.Provider, {
    value: {
      actions: actions,
      selectors: selectors
    }
  }, children));
});

var useActions = (function () {
  var dispatchRedux = reactRedux.useDispatch();

  var _useContext = React.useContext(ReducersProvider),
      actions = _useContext.actions;

  var request = React.useCallback(function (_ref) {
    var action = _ref.action,
        data = _ref.data,
        options = _ref.options;
    var module = action.module,
        name = action.name;
    dispatchRedux(actions[module].Creators[name + "Start"]({
      data: data,
      options: options || {}
    }));
  }, [dispatchRedux]);
  return {
    request: request,
    dispatch: request
  };
});

var useSelectors = (function (module) {
  var _useContext = React.useContext(ReducersProvider),
      selectors = _useContext.selectors;

  var valueProp = reactRedux.useSelector(function (state) {
    return selectors[module].state(state);
  });
  return valueProp;
});

var isNumber = ramda.is(Number);

var isString = ramda.is(String);

var isWithin = ramda.curry(function (min, max, value) {
  return isNumber(min) && isNumber(max) && isNumber(value) && ramda.gte(value, min) && ramda.lte(value, max);
});

var in200s = isWithin(200, 299);

var evolveResponse = function evolveResponse(response) {
  return _extends({}, response, {
    ok: in200s(response.status)
  });
};

var persistHeaders = function persistHeaders(response) {
  if (response.ok) {
    if (response.headers['access-token']) {
      persistAuthHeaders(persistData)(response.headers);
    }
  }

  return response;
};

var getData = function getData(data) {
  return data && data.data ? data.data : data;
};

var parseResponse = function parseResponse(response) {
  var isS3Presign = response.config.url.match('/s3/sign');

  if (response.ok && !response.data.errors && !isS3Presign) {
    return _extends({}, response, {
      data: humps.camelizeKeys(getData(response.data)),
      pagination: humps.camelizeKeys(getData(response.data.pagination)),
      meta: ramda.path(['data', 'meta'], response)
    });
  }

  return response;
};

var parseError = function parseError(error) {
  return Promise.reject(buildError(error.response));
};

var api = axios.create({
  baseURL: retrieveData('SG_MODULE_BASE_URL_API')
});
api.interceptors.request.use(function (request) {
  var authHeaders = retrieveAuthHeaders(retrieveData)();
  var data = request.data;

  if (!(data instanceof FormData)) {
    data = humps.decamelizeKeys(request.data);
  }

  var headersAuthRequest = {};
  Object.keys(authHeaders).forEach(function (key) {
    if (authHeaders[key]) {
      headersAuthRequest[key] = authHeaders[key];
    }
  });
  return _extends({}, request, {
    params: request.params ? humps.decamelizeKeys(request.params) : {},
    data: data,
    headers: _extends({}, request.headers, headersAuthRequest)
  });
});
api.interceptors.response.use(evolveResponse);
api.interceptors.response.use(persistHeaders);
api.interceptors.response.use(parseResponse, parseError);

Object.defineProperty(exports, 'all', {
  enumerable: true,
  get: function () {
    return effects.all;
  }
});
Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function () {
    return effects.call;
  }
});
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function () {
    return effects.put;
  }
});
Object.defineProperty(exports, 'takeLatest', {
  enumerable: true,
  get: function () {
    return effects.takeLatest;
  }
});
exports.axios = axios;
Object.defineProperty(exports, 'ReactReduxContext', {
  enumerable: true,
  get: function () {
    return reactRedux.ReactReduxContext;
  }
});
exports.Provider = Provider;
exports.ReducersProvider = ReducersProvider;
exports.api = api;
exports.clearAuthHeaders = clearAuthHeaders;
exports.history = history;
exports.persistData = persistData;
exports.removeData = removeData;
exports.retrieveAuthHeaders = retrieveAuthHeaders;
exports.retrieveData = retrieveData;
exports.setApiBaseUrl = setApiBaseUrl;
exports.useActions = useActions;
exports.useSelectors = useSelectors;
//# sourceMappingURL=index.js.map
