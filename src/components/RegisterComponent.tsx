import { useState } from 'react';
import { Button, Typography } from '@material-ui/core'
import RegisterCoachComponent from './RegisterCoachComponent';
import { Color } from '@material-ui/lab/Alert';
import RegisterPlayerComponent from './RegisterPlayerComponent';

interface IRegisterProps {
    open: boolean,
    setOpen: (openValue: boolean) => void,
    message: string,
    setMessage: (newMessage: string) => void,
    severity: Color | undefined,
    setSeverity: (newSeverity: Color | undefined) => void
}

function RegisterComponent(props: IRegisterProps) {
    const [formType, setFormType] = useState(undefined as String | undefined)

    return (
        (formType === 'player') ?
        // RegisterPlayerComponent goes in this fragment
        <>
            <RegisterPlayerComponent open={props.open} setOpen={props.setOpen} message={props.message} setMessage={props.setMessage} severity={props.severity} setSeverity={props.setSeverity}/>
        </>
        : (formType === 'coach') ?
        <>
            <RegisterCoachComponent open={props.open} setOpen={props.setOpen} message={props.message} setMessage={props.setMessage} severity={props.severity} setSeverity={props.setSeverity} />
        </>
        :
        <>
            <Button 
                id='form-type-player'
                variant='contained'
                color='primary'
                onClick={() => setFormType('player')}>
                    Player
            </Button>
            <Button 
                id='form-type-coach'
                variant='contained'
                color='primary'
                onClick={() => setFormType('coach')}>
                    Coach
            </Button>
        </>
    )
}

export default RegisterComponent;