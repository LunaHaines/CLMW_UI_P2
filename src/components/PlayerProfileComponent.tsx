import { createStyles, Input, InputLabel, Theme, makeStyles, Button, MenuItem, Select, Grid, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Color } from '@material-ui/lab/Alert';
import { Principal } from "../dtos/principal";
import { useState, useEffect } from 'react';
import { AddSport, DeleteSkill, getAuthorizedPlayer, AddSkill, DeleteSport } from "../remote/player-service";
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
            margin: theme.spacing(12),
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1)
        },
            display: {
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: theme.spacing(12)
        },
        addToProfileButton: {
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(12),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(15),
        }
    })
)

function PlayerProfileComponent(props: IPlayerProfileProps){
    const [skills, setSkills] = useState(undefined as {skill: string, rating: number}[] | undefined);
    const [sports, setSports] = useState(undefined as {sport: string}[] | undefined);

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
                    setFormData({
                        addedSkill: "",
                        addedSport: ""
                    })
                    showSkills();
                }
            } catch (e: any) {
                props.setMessage(e.response.data.message);
                props.setSeverity('error');
                props.setOpen(true);
            }
        }
    }

    let showSkills = async () => {
        try{
            if (props.authUser){
                let selectedPlayer = await getAuthorizedPlayer(props.authUser.username);
               let skillArr = selectedPlayer.skills;
                setSkills(skillArr);
                console.log(props.authUser)
            }
        }
        catch(e){
            console.log(e);
            console.log(props.authUser)
        }

    }

    let deleteSkill = async (skill: string) => {
        try {
            if(props.authUser){
                let deleteSkill = new AddToProfile(props.authUser.username, skill);
                await DeleteSkill(deleteSkill);
                props.setMessage(`Successfully deleted`);
                props.setSeverity('success');
                props.setOpen(true);
                console.log("5");
                showSkills();
            }
        } catch (e: any) {
            props.setMessage(e.response.data.message);
            props.setSeverity('error');
            props.setOpen(true);
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
                    showSports();
                    setFormData({
                        addedSkill: "",
                        addedSport: ""
                    })
                }
            } catch (e: any) {
                props.setMessage(e.response.data.message);
                props.setSeverity('error');
                props.setOpen(true);
            }
        }
    }

    let showSports = async () => {
        try{
            if (props.authUser){
                let selectedPlayer = await getAuthorizedPlayer(props.authUser.username);
                let sportArr = selectedPlayer.sports;
                setSports(sportArr);
                console.log(sports);
            }
        }
        catch(e){
            console.log(e);
        }

    }

    let deleteSport = async (sport: string) => {
        try {
            if(props.authUser){
                let deleteSport = new AddToProfile(props.authUser.username, sport);
                await DeleteSport(deleteSport);
                props.setMessage(`Successfully deleted`);
                props.setSeverity('success');
                props.setOpen(true);
                showSports();
            }
        } catch (e: any) {
            props.setMessage(e.response.data.message);
            props.setSeverity('error');
            props.setOpen(true);
        }
    }

    useEffect(() => {
        showSkills();
        showSports();
    }, [])

    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item sm={8}>
                    <div className={classes.root}>
                        <FormControl margin='normal' fullWidth>
                            <InputLabel htmlFor='addedSkill'>Add Skill</InputLabel>
                            <Input
                                onChange={handleChange}
                                id='addedSkill'
                                name='addedSkill'
                                type='text'
                                placeholder='Enter a Skill to add'
                                value={formData.addedSkill}
                            />
                        </FormControl>
                    </div>
                </Grid>
                <Grid item sm>
                    <tbody className={classes.display}>
                        {skills?.map(
                        (item:any, index:any) =>
                        (
                            <tr key={index}>
                                <td><Typography variant='h6'>{item.skill}</Typography></td>
                                <td><Typography variant='h6'>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography></td>
                                <td><Typography variant='h6'>{item.rating}</Typography></td>
                                <td><Typography variant='h6'>&nbsp;&nbsp;&nbsp;&nbsp;</Typography></td>
                                <td><Button variant='contained' color='secondary' size='small' 
                                        onClick={() => deleteSkill(item.skill)}>Delete</Button></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Grid>
            </Grid>
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
            <Grid container>
                <Grid item sm={8}>
                <div className={classes.root}>
            <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="addedSport">sport</InputLabel>
                    <Select
                        id="addedSport"
                        name="addedSport"
                        label="Sport"
                        onChange={handleChange}
                        value={formData.addedSport}
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
            
                </Grid>
                <Grid item sm>
                    <tbody className={classes.display}>
                        {sports?.map(
                        (item:any, index:any) =>
                        (
                            <tr key={index} >
                                <td><Typography variant='h6'>{item}</Typography></td>
                                <td><Typography variant='h6'>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Typography></td>
                                <td><Button variant='contained' color='secondary' size='small' 
                                        onClick={() => deleteSport(item)}>Delete</Button></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Grid>
            </Grid>
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