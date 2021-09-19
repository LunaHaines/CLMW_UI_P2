import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { RegisterNewPlayer } from '../../remote/player-service';

interface IRegisterPlayerProps{
    open: boolean,
    setOpen: (openValue: boolean) => void,
    message: string,
    setMessage: (newMessage: string) => void,
    severity: Color | undefined,
    setSeverity: (newSeverity: Color | undefined) => void
}

function Alert(props: AlertProps){
    return <MuiAlert elevation={6} variant='filled' {...props} />;
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

function RegisterPlayerComponent (props: IRegisterPlayerProps){

    const history = useHistory();

    const [playerFormData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        sports: ""
    });

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(e.target);
        setFormData({...playerFormData, [name]: value});
    }

    let isFormValid = () => {
        console.log(playerFormData);
        for (const [key,value] of Object.entries(playerFormData)){
            console.log(value);
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
            props.setOpen(true)
            return;
        }

        try {
             const configuredData = {
                 ...playerFormData, sports: [playerFormData.sports]
             }
            await RegisterNewPlayer(configuredData);
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
            <Typography align='center' variant='h3'>Register as a Player</Typography>
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
                    <InputLabel htmlFor='sports'>Sport</InputLabel>
                    <Input
                        onChange={ handleChange }
                        id='sports'
                        name='sports'
                        type='text'
                        placeholder='Enter your sport'
                    />
                </FormControl>


                <br/><br/>
                <Button
                    id='register-player-button'
                    onClick={register}
                    variant='contained'
                    color='primary'
                    size='medium'
                >Register</Button>
            </div>
        </>
    )
}

export default RegisterPlayerComponent;