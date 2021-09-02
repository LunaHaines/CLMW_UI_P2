import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import { useState } from 'react';
import { Principal } from './dtos/principal';
import RegisterComponent from './components/RegisterComponent';

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined)

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <HomeComponent currentUser={authUser} /> } />
          <Route path='/register' render={() => <RegisterComponent /> } />
        </Switch>
      </Router>
    </>
  );
}

export default App;
