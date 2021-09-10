import React from 'react';
import './App.css';
import clsx from 'clsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import { useState } from 'react';
import { Principal } from './dtos/principal';
import RegisterComponent from './components/RegisterComponent';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { AppBar, IconButton, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import LoginComponent from './components/LoginComponent';
import MenuIcon from '@material-ui/icons/Menu'
import SidebarComponent from './components/SidebarComponent';
import WorkoutComponent from './components/WorkoutsComponent';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      margin: theme.spacing(7) + 1
    },
    navigation: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width','margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    }
  })
)

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

  const classes = useStyles();

  return (
    <>
      <Router>
      <div className={classes.navigation}>
        <AppBar position='static' className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}>
          <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' className={clsx(classes.menuButton, {[classes.hide]: drawerOpen})}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              TeaManager
            </Typography>
          </Toolbar>
        </AppBar>
        <SidebarComponent authUser={authUser} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      </div>
      <div className={classes.root}>
          <Switch>
            <Route exact path='/' render={() => <HomeComponent currentUser={authUser} /> } />
            <Route path='/register' render={() => <RegisterComponent open={open} setOpen={setOpen} message={message} setMessage={setMessage} severity={severity} setSeverity={setSeverity} /> } />
            <Route path='/login' render={() => <LoginComponent setAuthUser={setAuthUser} open={open} setOpen={setOpen} message={message} setMessage={setMessage} severity={severity} setSeverity={setSeverity} /> } />
            <Route path='/workouts' render={() => <WorkoutComponent /> } />
          </Switch>
        </div>
      </Router>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
