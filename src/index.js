/* global config */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import type Store from 'redux';
import reducers from './reducers/_combined';

import App from './App';
import type AppState from './AppState';

const store : Store<AppState> = createStore(
  reducers,
  {},
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App config={config} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
