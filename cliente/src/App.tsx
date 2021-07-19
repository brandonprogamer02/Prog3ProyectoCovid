import React from 'react';
import Container from './components/Container/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Container />
    </BrowserRouter>
  );
}

export default App;
