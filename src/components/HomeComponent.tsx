import { Principal } from '../dtos/principal';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IHomeProps {
    currentUser: Principal | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        justifyContent: 'center',
        textAlign: 'center',
        background: 'rgba(69, 211, 69, 0.51)',
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(32),
        height: theme.spacing(20),
      },
    },
    title: {
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(4)
        }
    },
    buttonContainer: {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(2),
        },
    },
    buttonText: {
        color: 'black',
        textDecoration: 'none',
    }
  }),
);

function HomeComponent(props: IHomeProps) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.title}>
            <Typography variant='h1'>
                Team Management Lives Here
            </Typography>
            </div>
            <div className={classes.root}>
                <Paper elevation={3}>
                    <Typography variant='h4'>
                        Find New Players
                    </Typography>
                </Paper>
                <Paper elevation={3}>
                    <Typography variant='h4'>
                        Provide Excercises and Workouts
                    </Typography>
                </Paper>
                <Paper elevation={3}>
                    <Typography variant='h4'>
                        Build Your Team
                    </Typography>
                </Paper>
            </div>
            <br/><br/>
            <div className={classes.buttonContainer}>
            <Button
                id='go-to-register'
                variant='contained'
                color='default'
                size='large'>
                <Typography color='inherit' variant='h6'>
                    <Link to='/register' className={classes.buttonText}>Register</Link>
                </Typography>
            </Button>
            <Button
                id='go-to-login'
                variant='contained'
                color='default'
                size='large'>
                <Typography color='inherit' variant='h6'>
                    <Link to='/login' className={classes.buttonText}>Login</Link>
                </Typography>
            </Button>
            </div>
        </>
    )

}

export default HomeComponent;