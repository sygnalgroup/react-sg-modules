# react-sg-modules

> Easy way to handle react-redux with redux-sagas and reduxsauce

With this package you can execute async requests and change the store automatically

[![NPM](https://img.shields.io/badge/react--sg--modules-sygnalgroup-green)](https://www.npmjs.com/package/@sygnalgroup/react-sg-modules) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Example crud using the package
[Crud with react-sg-modules](https://github.com/sygnalgroup/example-use-sg-modules)

## Install

```bash
npm install --save @sygnalgroup/react-native-sg-modules

OR

npm i --save @sygnalgroup/react-native-sg-modules
```

## Usage/Examples

If you will use async requests, can set the api base url from in setApiBaseUrl method.

```javascript

import { setApiBaseUrl } from '@sygnalgroup/react-sg-modules';

setApiBaseUrl(BASE_URL_API);

```

Customize the api auth keys - this keys the lib auto persist in the headers and always update.

DEFAULT - ['uid', 'access-token', 'expiry', 'client'];

If you want costumize the headers keys, you need export authHeaders from modules/index.js in your project

```javascript

const authHeaders = ['uid', 'access-token', 'expiry', 'client'];

export { authHeaders };

```

## Provider

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
    api: () => api.get('/todo'),
    action: { // PARAMS TO EACH REDUCER ACTION
      start: ['params'], // REQUIRE - CAN BE OMITTED
      error: ['error'],
      success: ['data'],
    },
    *sagas(Creators, { params }) { // OPTIONAL METHOD - THE DEFAULT CALL (SUCCESS OR ERROR)
      try {
        const resp = yield call(actions.getChannels.api);
        yield put(Creators.getTodoListSuccess(resp.data));
      } catch (error) {
        yield put(Creators.getTodoListError(getErrorMessage(error)));
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
    api: () => api.get('/todo'),
    action: {
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
  const { dispatch } = useActions();
  const { data } = useSelectors(todoModule);
  const load = () => {
    dispatch({
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
export {
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
  setApiBaseUrl,
  ReactReduxContext
}
```

If you want add moddlewares in redux store you can add this method storeMiddlewares in your modules.js, this method must return a array

the package will import this function from your project and add the middlewares in the store.

EXAMPLE - routerMiddleware from connected-react-router
```javascript

export const storeMiddlewares = (history) => [routerMiddleware(history)];

```


## USE MODULE WITHOUT REQUESTS - REDUX STORE MODULE

EXAMPLE app.js module

```javascript

export const appModule = 'app';

const actions = {
  setTitle: {
    action: {
      success: ['title'],
    },
  },
};

const app = {
  actions,
  state: {
    title: 'My App',
  },
}

export default app;

```

USAGE

```javascript
const { dispatch } = useActions();
const { title } = useSelectors(appModule);

useEffect(() => {
  dispatch({
    action: Modules.app.actions.setTitle,
    data: 'Posts Title'
  })
}, [dispatch]);

```

## License

MIT © [sygnalgroup](https://github.com/sygnalgroup)
