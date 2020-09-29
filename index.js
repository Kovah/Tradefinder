import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './src/App';
import store from './src/app/store';
import { saveState } from './src/app/localstorage';

export const appVersion = 1601423695;

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);
