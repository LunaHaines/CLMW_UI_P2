import { useState } from 'react';
import { Button, Typography } from '@material-ui/core'
import RegisterCoachComponent from './RegisterCoachComponent';

function RegisterComponent() {
    const [formType, setFormType] = useState(undefined as String | undefined)

    return (
        (formType === 'player') ?
        // RegisterPlayerComponent goes in this fragment
        <>
        </>
        : (formType === 'coach') ?
        <>
            <RegisterCoachComponent />
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