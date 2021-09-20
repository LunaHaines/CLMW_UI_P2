import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { registerNewRecruiter } from '../../remote/recruiter-service';

interface IRegisterRecruiterProps{
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

function RegisterRecruiterComponent (props: IRegisterRecruiterProps){

    const history = useHistory();

    const [recruiterFormData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        pin: ""
    });

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(e.target);
        setFormData({...recruiterFormData, [name]: value});
        console.log(recruiterFormData);
    }

    let isFormValid = () => {
        console.log(recruiterFormData);
        for (const [key, value] of Object.entries(recruiterFormData)){
            console.log(key,value);
            if (!value){
                console.log(value);
                return false;
            }
        }
        return true;
    }

    let register = async () => {

        if(!isFormValid()){
            props.setMessage('Please fill in all fields');
            props.setSeverity('warning');
            props.setOpen(true);
            return;
        }

        try {
            await registerNewRecruiter(recruiterFormData);
            props.setMessage('Successfully registered!');
            props.setSeverity('success');
            props.setOpen(true);
            history.push('/login');
        } catch (e: any){
            props.setSeverity('error');
            props.setMessage(e.response.data.message);
            props.setOpen(true);
        }
    }

    const classes = useStyles();

    return (
        <>
            <Typography align='center' variant='h3'>Register as a Recruiter</Typography>
            <div className={classes.root}>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='name'>Your Name</InputLabel>
                    <Input
                        onChange={ handleChange }
                        id='name'
                        name='name'
                        type='text'
                        placeholder='Enter your name'
                    />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input
                        onChange={ handleChange }
                        id='username'
                        name='username'
                        type='text'
                        placeholder='Enter your username'
                    />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='password'>Your Password</InputLabel>
                    <Input
                        onChange={ handleChange }
                        id='password'
                        name='password'
                        type='text'
                        placeholder='Enter your password'
                    />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                <InputLabel htmlFor='teamName'>Recruiter pin</InputLabel>
                <Input
                    onChange={handleChange}
                    id='pin'
                    name='pin'
                    type='text'
                    placeholder='Enter pin'
                />
            </FormControl>
                <br/><br/>
                <Button
                    id='register-recruiter-button'
                    onClick={register}
                    variant='contained'
                    color='primary'
                    size='medium'
                >Register</Button>
            </div>
        </>
    )
}

export default RegisterRecruiterComponent;