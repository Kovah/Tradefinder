import React, { useState } from 'react';

import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { Main } from './layout/Main';

export function App () {
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
