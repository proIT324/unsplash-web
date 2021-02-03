import React, { useState } from 'react';
import './App.css';

import { PhotoList, SearchForm } from './components'

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <div className="App">
      <SearchForm onSubmit={setQuery} />
      <PhotoList query={query} />
    </div >
  )
};

export default App;
