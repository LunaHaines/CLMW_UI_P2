import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import { useState } from 'react';
import { Principal } from './dtos/principal';
import RegisterComponent from './components/RegisterComponent';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core';
import LoginComponent from './components/LoginComponent';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error' as Color | undefined)

  let handleClose = (e?: React.SyntheticEvent, r?: string) => {
    if (r === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <HomeComponent currentUser={authUser} /> } />
          <Route path='/register' render={() => <RegisterComponent open={open} setOpen={setOpen} message={message} setMessage={setMessage} severity={severity} setSeverity={setSeverity} /> } />
          <Route path='/login' render={() => <LoginComponent setAuthUser={setAuthUser} open={open} setOpen={setOpen} message={message} setMessage={setMessage} severity={severity} setSeverity={setSeverity} /> } />
        </Switch>
      </Router>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
