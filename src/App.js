import React from 'react';

import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { Main } from './layout/Main';

export const appVersion = 1674997450;

export function App () {
  return (
    <div className="container mx-auto max-w-8xl p-4 md:p-8">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
