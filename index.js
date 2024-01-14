import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './src/app/store';
import { saveState } from './src/app/localstorage';
import { App } from './src/App';

store.subscribe(() => {
  saveState(store.getState());
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
  <App/>
</Provider>
);
