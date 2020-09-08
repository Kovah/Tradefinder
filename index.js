import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <div className={'container mx-auto max-w-5xl py-8'}>
    <Header/>
    <Footer/>
  </div>
);

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);
