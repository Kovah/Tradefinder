import React from 'react';

import Footer from './layout/Footer';
import { Header } from './layout/Header';

class App extends React.Component {
  render () {
    return (
      <div className="container mx-auto max-w-5xl py-8">
        <Header/>
        <Footer/>
      </div>
    );
  }
}

export default App;
