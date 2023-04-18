import React from 'react';
import { Button } from '@mui/material';

interface EntryPath {
  uri: string;
  title: string;
  description: string;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Learn React and MUI</Button>
      </header>
    </div>
  );
}

export default App;
