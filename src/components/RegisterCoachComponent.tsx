import { Button, FormControl, Input, InputLabel, Snackbar, Typography } from "@material-ui/core";
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { useState } from "react";
import { useHistory } from "react-router";
import { registerNewCoach } from "../remote/coach-service";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function RegisterCoachComponent() {

    const history = useHistory();

    const [formData, setFormData] = useState({
        coachName: '',
        username: '',
        password: '',
        sport: '',
        teamName: ''
    });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('error' as Color | undefined)

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let handleClose = (e?: React.SyntheticEvent, r?: string) => {
        if (r === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    let isFormValid = () => {
        for (const [key,value] of Object.entries(formData)) {
            if (!value) {
                return false;
            }
        }
        return true;
    }

    let register = async () => {
        
        if (!isFormValid()) {
            setMessage('Please fill in all fields');
            setSeverity('warning');
            setOpen(true)
            return;
        }

        try {
            await registerNewCoach(formData);
            setMessage('Successfully registered!');
            setSeverity('success');
            setOpen(true)
            history.push('/login')
        } catch (e: any) {
            setSeverity('error')
            setMessage(e.message);
            setOpen(true);
        }
    }

    return (
        <>
            <Typography align='center' variant='h3'>Register Your Team!</Typography>

            <FormControl margin='normal' fullWidth>
                <InputLabel htmlFor='coachName'>Your Name</InputLabel>
                <Input
                    onChange={handleChange}
                    id='coachName'
                    name='coachName'
                    type='text'
                    placeholder='Enter your name'
                />
            </FormControl>

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

            <FormControl margin='normal' fullWidth>
                <InputLabel htmlFor='sport'>Sport</InputLabel>
                <Input
                    onChange={handleChange}
                    id='sport'
                    name='sport'
                    type='text'
                    placeholder='Enter your sport'
                />
            </FormControl>

            <FormControl margin='normal' fullWidth>
                <InputLabel htmlFor='teamName'>Team Name</InputLabel>
                <Input
                    onChange={handleChange}
                    id='teamName'
                    name='teamName'
                    type='text'
                    placeholder='Enter your team name'
                />
            </FormControl>
            <br/><br/>
            <Button
                id='register-coach-button'
                onClick={register}
                variant='contained'
                color='primary'
                size='medium'>Register</Button>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default RegisterCoachComponent;