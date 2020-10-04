import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './src/app/store';
import { saveState } from './src/app/localstorage';
import { App } from './src/App';

export const appVersion = 1601821226;

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);
