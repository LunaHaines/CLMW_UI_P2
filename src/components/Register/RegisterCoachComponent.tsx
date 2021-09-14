import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { Color } from '@material-ui/lab/Alert'
import { useState } from "react";
import { useHistory } from "react-router";
import { registerNewCoach } from "../remote/coach-service";

interface IRegisterCoachProps {
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
        }
    }))

function RegisterCoachComponent(props: IRegisterCoachProps) {

    const history = useHistory();

    const [formData, setFormData] = useState({
        coachName: '',
        username: '',
        password: '',
        sport: '',
        teamName: ''
    });

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
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
            props.setMessage('Please fill in all fields');
            props.setSeverity('warning');
            props.setOpen(true)
            return;
        }

        try {
            await registerNewCoach(formData);
            props.setMessage('Successfully registered!');
            props.setSeverity('success');
            props.setOpen(true)
            history.push('/login')
        } catch (e: any) {
            props.setSeverity('error')
            props.setMessage(e.response.data.message);
            props.setOpen(true);
        }
    }

    const classes = useStyles();

    return (
        <>
            <Typography align='center' variant='h3'>Register Your Team!</Typography>
            <div className={classes.root}>
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
            </div>
        </>
    )
}

export default RegisterCoachComponent;