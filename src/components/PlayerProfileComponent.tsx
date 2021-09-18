import { createStyles, Input, InputLabel, Theme, makeStyles, Button, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Color } from '@material-ui/lab/Alert';
import { Principal } from "../dtos/principal";
import { useState } from "react";
import { AddSkill } from "../remote/player-service";
import { AddSport } from "../remote/player-service";
import { AddToProfile } from "../dtos/addToProfile";

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
                if(props.authUser){
                    let persistingSkill = new AddToProfile(props.authUser.username, formData.addedSkill);
                    let persistedSkill = await AddSkill(persistingSkill);
                    props.setMessage(`${persistedSkill} successfully added`);
                    props.setSeverity('success');
                    props.setOpen(true);
                }
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
                if (props.authUser){
                    let persistingSport = new AddToProfile(props.authUser.username, formData.addedSport);
                    let persistedSport = await AddSport(persistingSport);
                    props.setMessage(`${persistedSport} successfully added`);
                    props.setSeverity('success');
                    props.setOpen(true);
                }
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
            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="addedSport">sport</InputLabel>
                    <Select
                        id="addedSport"
                        name="addedSport"
                        label="Sport"
                        onChange={handleChange}
                    >
                        <MenuItem value="Baseball">Baseball</MenuItem>
                        <MenuItem value="Basketball">Basketball</MenuItem>
                        <MenuItem value="Bocce">Bocce</MenuItem>
                        <MenuItem value="Boxing">Boxing</MenuItem>
                        <MenuItem value="Cricket">Cricket</MenuItem>
                        <MenuItem value="Football">Football (American)</MenuItem>
                        <MenuItem value="Soccer">Football (Soccer)</MenuItem>
                        <MenuItem value="Golf">Golf</MenuItem>
                        <MenuItem value="Gymnastics">Gymnastics</MenuItem>
                        <MenuItem value="Technical">Hockey</MenuItem>
                        <MenuItem value="Lacrosse">Lacrosse</MenuItem>
                        <MenuItem value="Rugbyl">Rugby</MenuItem>
                        <MenuItem value="Table Tennis">Table Tennis</MenuItem>
                        <MenuItem value="Tennis">Tennis</MenuItem>
                        <MenuItem value="Volleyball">Volleyball</MenuItem>
                        <MenuItem value="Wrestling">Wrestling</MenuItem>
                    </Select>
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