import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import { useState } from 'react';
import { Principal } from './dtos/principal';
import RegisterComponent from './components/RegisterComponent';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { AppBar, IconButton, Snackbar, Toolbar, Typography } from '@material-ui/core';
import LoginComponent from './components/LoginComponent';
import MenuIcon from '@material-ui/icons/Menu'
import SidebarComponent from './components/SidebarComponent';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error' as Color | undefined)
  const [drawerOpen, setDrawerOpen] = useState(false);

  let handleClose = (e?: React.SyntheticEvent, r?: string) => {
    if (r === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  let handleDrawerOpen = () => {
    setDrawerOpen(true);
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            TeaManager
          </Typography>
        </Toolbar>
      </AppBar>
      <SidebarComponent authUser={authUser} setDrawerOpen={setDrawerOpen}/>
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
