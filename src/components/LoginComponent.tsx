import { Button, createStyles, Input, InputLabel, makeStyles, Theme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Color } from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Principal } from '../dtos/principal';
import { coachLogin } from '../remote/auth-service';
import { recruiterLogin } from '../remote/auth-service';
import { playerLogin } from '../remote/auth-service';


interface ILoginProps {
    setAuthUser: (nextUser: Principal | undefined) => void,
    open: boolean,
    setOpen: (openValue: boolean) => void,
    message: string,
    setMessage: (newMessage: string) => void,
    severity: Color | undefined,
    setSeverity: (newSeverity: Color | undefined) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(12)
        },
        role: {
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(12)
        },
        loginButton: {
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(12)
        }
    })
)

function LoginComponent(props: ILoginProps) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'player'
    })
    
    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let login = async () => {
        if (!formData.username || !formData.password) {
            props.setMessage('Please provide a username and password');
            props.setSeverity('warning');
            props.setOpen(true);
        }
        if (formData.role === 'coach') {
            try {
                let principal = await coachLogin(formData);
                props.setAuthUser(principal);
                props.setMessage('successfully logged in!');
                props.setSeverity('success');
                props.setOpen(true);
                history.push('/coachdashboard')
            } catch (e: any) {
                props.setSeverity('error');
                props.setMessage(e.response?.data.message);
                props.setOpen(true);
            }
        }else if (formData.role === 'recruiter'){
            try {
                let principal = await recruiterLogin(formData);
                props.setAuthUser(principal);
                props.setMessage('successfully logged in!');
                props.setSeverity('success');
                props.setOpen(true);
                history.push('/recruiterdashboard')
            } catch (e: any) {
                props.setSeverity('error');
                props.setMessage(e.response.data.message);
                props.setOpen(true);
            }
        }else if (formData.role === 'player'){
            try{
                let principal = await playerLogin(formData);
                props.setAuthUser(principal);
                props.setMessage('successfully logged in!');
                props.setSeverity('success');
                props.setOpen(true);
                history.push('/playerdashboard');
            } catch (e: any){
                props.setSeverity('error');
                props.setMessage(e.response.data.message);
                props.setOpen(true);
            }
        }
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='username'
                        name='username'
                        type='text'
                        placeholder='Enter your username'
                    />
                </FormControl>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Enter your password'
                    />
                </FormControl>
            </div>
            <FormControl component="fieldset" className={classes.role}>
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup aria-label="role" name="role" value={formData.role} onChange={handleChange}>
                    <FormControlLabel value="player" control={<Radio />} label="player" />
                    <FormControlLabel value="coach" control={<Radio />} label="coach" />
                    <FormControlLabel value="recruiter" control={<Radio />} label="recruiter" />
                </RadioGroup>
            </FormControl>
            <Button
                id='login-button'
                className={classes.loginButton}
                name='login'
                onClick={login}
                variant='contained'
                color='primary'
                size='large'>
                Login
            </Button>
        </>
    )
}

export default LoginComponent;