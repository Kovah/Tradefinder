import React from 'react';

import Footer from './layout/Footer';
import { Header } from './layout/Header';
import { Main } from './layout/Main';

class App extends React.Component {
  render () {
    return (
      <div className="container mx-auto max-w-5xl p-8">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
