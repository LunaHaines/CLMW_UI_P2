import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import { useState } from 'react';
import { Principal } from './dtos/principal';

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined)

  return (
    <>
      <Router>
        <HomeComponent currentUser={authUser} />
      </Router>
    </>
  );
}

export default App;
