import { useState } from 'react';
import { Button, Typography } from '@material-ui/core'

function RegisterComponent() {
    const [formType, setFormType] = useState(undefined as String | undefined)

    return (
        (formType === 'player') ?
        // RegisterPlayerComponent goes in this fragment
        <>
        </>
        : (formType === 'coach') ?
        <>
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
        </>
    )
}

export default RegisterComponent