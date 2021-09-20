import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import { DataGrid, GridColDef, GridToolbarFilterButton } from "@mui/x-data-grid";
import { useState } from "react";
import { ExpPlayer } from "../dtos/expanded-player";
import { Player } from "../dtos/player";
import { rateSkill, recruitAllPlayers } from "../remote/player-service";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

interface IRecruiterDashboardProps {
    setOpen: (openValue: boolean) => void,
    setMessage: (newMessage: string) => void,
    setSeverity: (newSeverity: Color | undefined) => void
}

function RecruiterDashboard(props: IRecruiterDashboardProps) {
    const [players, setPlayers] = useState(undefined as ExpPlayer[] | undefined);
    const [selectedPlayer, setSelectedPlayer] = useState(undefined as ExpPlayer | undefined);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [skill, setSkill] = useState('');
    const [rating, setRating] = useState(0);

    let getPlayers = async() => {
        if (!players) {
            let response = await recruitAllPlayers();
            setPlayers(response);
        }
    }

    getPlayers();

    let showSkills = (player: ExpPlayer) => {
        setSelectedPlayer(player);
        setDialogOpen(true);
    }

    let handleClose = () => {
        setDialogOpen(false);
    }

    let handleSkillChange = (e: any) => {
        setSkill(e.target.value);
    }

    let handleRatingChange = (e: any) => {
        setRating(e.target.value);
    }

    let ratePlayerSkill = async () => {
        try {
            if (selectedPlayer) {
                await rateSkill(selectedPlayer.username, skill, rating);
                let response = await recruitAllPlayers();
                setPlayers(response);
                props.setOpen(true);
                props.setMessage('Skill successfully rated');
                props.setSeverity('success');
            }
        } catch (e: any) {
            props.setOpen(true);
            props.setMessage(e.response?.data.message);
            props.setSeverity('error');
        } finally {
            handleClose();
        }
    }

    const classes = useStyles();

    let index = 1;

    return (
        <div className={classes.root}>
            {players?.map((p) => {
                return (
                    <>
                        <Typography variant='body1'><b>{index}</b> <b>Name:</b> {p.name} | <b>Username:</b> {p.username} | <b>Sport:</b> {p.sports ? p.sports.map((s) => {return (`${s}, `)}) : 'none'} | <b>Team:</b> {p.teamName ? p.teamName : 'none'}</Typography>
                        <Button
                            id={p.username}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {showSkills(p)}}
                        >Skills</Button>
                        <br/>
                        <br/>
                    </>
                )
            })}
            <Dialog open={dialogOpen} id='dialog' onClose={handleClose}>
                <DialogTitle>{selectedPlayer?.name}'s skills</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selectedPlayer?.skills.map((s) => {
                            return (
                            <>
                                <b>skill:</b> {s.skill} <b>rating:</b> {s.rating}
                                <br/>
                            </>
                            )
                        })}
                        Assign this player a new rating?
                    </DialogContentText>
                    <TextField id='skill' label='Skill' variant='outlined' onChange={handleSkillChange} fullWidth />
                    <TextField id='rating' label='Rating' variant='outlined' onChange={handleRatingChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} id='cancel' variant='outlined' color='primary'>
                        Cancel
                    </Button>
                    <Button
                        id='rate-skill'
                        variant='outlined'
                        color='primary'
                        onClick={ratePlayerSkill}
                    >Rate</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RecruiterDashboard;