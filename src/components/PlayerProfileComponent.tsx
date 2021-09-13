import { createStyles, Input, InputLabel, Theme, makeStyles, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Color } from '@material-ui/lab/Alert';
import { Principal } from "../dtos/principal";
import { useState } from "react";
import { AddSkill } from "../remote/player-service";
import { AddSport } from "../remote/player-service";

interface IPlayerProfileProps{
    authUser: Principal | undefined,
    setOpen: (openValue: boolean) => void,
    setMessage: (newMessage: string) => void,
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
        addToProfileButton: {
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(12)
        }
    })
)

function PlayerProfileComponent(props: IPlayerProfileProps){

    const [formData, setFormData] = useState({
        addedSkill: "",
        addedSport: ""
    })

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let addSkill = async () => {
        if (!formData.addedSkill){
            props.setMessage('Please provide a skill');
            props.setSeverity('warning');
            props.setOpen(true);
        } else {
            try {
                let persistedSkill = await AddSkill(formData.addedSkill);
                props.setMessage(`${persistedSkill} successfully added`);
                props.setSeverity('success');
                props.setOpen(true);
            } catch (e: any) {
                props.setMessage(e.response.data.message);
                props.setSeverity('error');
                props.setOpen(true);
            }
        }
    }

    let addSport = async () => {
        if (!formData.addedSport){
            props.setMessage('Please provide a sport');
            props.setSeverity('warning');
            props.setOpen(true);
        } else {
            try {
                let persistedSport = await AddSport(formData.addedSport);
                props.setMessage(`${persistedSport} successfully added`);
                props.setSeverity('success');
                props.setOpen(true);
            } catch (e: any) {
                props.setMessage(e.response.data.message);
                props.setSeverity('error');
                props.setOpen(true);
            }
        }
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='addedSkill'>Add Skill</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='addedSkill'
                        name='addedSkill'
                        type='text'
                        placeholder='Enter a Skill to add'
                    />
                </FormControl>
            </div>
            <Button
                id='add-skill-button'
                className={classes.addToProfileButton}
                name='login'
                onClick={addSkill}
                variant='contained'
                color='primary'
                size='large'
                >  Add Skill
            </Button>
            <div className={classes.root}>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='addedSport'>Add Sport</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='addedSort'
                        name='addedSport'
                        type='text'
                        placeholder='Enter a Skill to add'
                    />
                </FormControl>
            </div>
            <Button
                id='add-sport-button'
                className={classes.addToProfileButton}
                name='login'
                onClick={addSport}
                variant='contained'
                color='primary'
                size='large'
                >  Add Sport
            </Button>
        </>
    )

}

export default PlayerProfileComponent;