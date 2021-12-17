# react-sg-modules

> Easy way to handle react-redux with redux-sagas and reduxsauce

With this package you can execute async requests and change the store automatically

This package require react-router and react-hooks

[![NPM](https://img.shields.io/npm/v/react-sg-modules.svg)](https://www.npmjs.com/package/react-sg-modules) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-sg-modules
```

## Usage/Examples

If you will use async requests, can set the api base url from this method.

```javascript

import { setApiBaseUrl } from '@sygnalgroup/react-sg-modules';

setApiBaseUrl(BASE_URL_API);

```

So, add the provider

```javascript

import { Provider } from '@sygnalgroup/react-sg-modules';

<Provider>
  <App />
</Provider>

```


## MODULES

CREATE MODULE - TODO

todo/index.js
```javascript
import api from 'core/api';

export const todoModule = 'todo';

const actions = {
  getTodoList: {
    module: todoModule,
    name: 'getTodoList',
    api: () => api.get('/todo'),
    params: { // PARAMS TO EACH REDUCER ACTION
      start: ['params'], // PARAMS REQUIRED.
      error: ['error'],
      success: ['data'],
    },
    *sagas(Creators, { params }) { // OPTIONAL METHOD - THE DEFAULT CALL (SUCCESS OR ERROR)
      try {
        const resp = yield call(actions.getChannels.api);
        yield put(Creators.getChannelsSuccess(resp.data));
      } catch (error) {
        yield put(Creators.getChannelsError(getErrorMessage(error)));
      }
    },
    state: { // STATES TO CHANGE IN EACH REDUCER ACTION
      start: { loadingTodoList: true },
      error: { loadingTodoList: false },
      success: { loadingTodoList: false },
    },
  },
};

export default {
  actions,
  state: { // ALL STATES FROM THE MODULE
    loadingTodoList: false,
    data: [],
  },
};


OR

import api from 'core/api';

export const todoModule = 'todo';

const actions = {
  getTodoList: {
    module: todoModule,
    name: 'getTodoList',
    api: () => api.get('/channels'),
    params: {
      start: ['params'],
      error: ['error'],
      success: ['data'],
    },
  },
};

export default {
  actions,
  state: {
    data: [],
  },
};

```

Create a file in src/modules/index.js and import the modules

modules/index.js

```javascript
import todo from './todo/index';

const Modules = {
  todo,
};

export default Modules;

```

USAGE ACTIONS AND SELECTORS

```
import React, { useEffect } from 'react';
import Modules from 'modules';
import useActions from 'modules/map/useActions';
import useSelectors from 'modules/map/useSelectors';
import { todoModule } from 'modules/todo';

const TodoList = () => {
  const actions = useActions();
  const { data } = useSelectors(todoModule);
  const load = () => {
    actions.request({
      action: Modules.todo.actions.getTodoList,
      data: {},
      options: {
        onSuccess: () => {},
        onError: () => {},
      },
    });
  };

  useEffect(() => {
    load();
  }, []);

  return <div>{data && data.map((item) => <div>{item.name}</div>)}</div>;
};

export default TodoList;


```


## EXPORT MODULES
```javascript
{
  Provider,
  history,
  useActions,
  useSelectors,
  ReducersProvider,
  api,
  axios,
  retrieveAuthHeaders,
  persistData,
  removeData,
  retrieveData,
  clearAuthHeaders,
  setApiBaseUrl
}
```

If you want add moddlewares in redux store you can add this method storeMiddlewares in your modules.js, this method must return a array

the package will import this function from your project and add the middlewares in the store.

EXAMPLE - routerMiddleware from connected-react-router
```javascript

export const storeMiddlewares = (history) => [routerMiddleware(history)];

```

## License

MIT © [sygnalgroupbr](https://github.com/sygnalgroupbr)
