import React from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';

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
