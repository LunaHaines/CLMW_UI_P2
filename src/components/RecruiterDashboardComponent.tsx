import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { DataGrid, GridColDef, GridToolbarFilterButton } from "@mui/x-data-grid";
import { useState } from "react";
import { ExpPlayer } from "../dtos/expanded-player";
import { Player } from "../dtos/player";
import { recruitAllPlayers } from "../remote/player-service";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

function RecruiterDashboard() {
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

    let rateSkill = () => {
        // add api call here
    }

    const classes = useStyles();

    let index = 1;

    return (
        <div className={classes.root}>
            {players?.map((p) => {
                return (
                    <>
                        <Typography variant='body1'><b>{index}</b> <b>Name:</b> {p.name} | <b>Username:</b> {p.username} | <b>Sport:</b> {p.sport ? p.sport : 'none'} | <b>Team:</b> {p.teamName ? p.teamName : 'none'}</Typography>
                        <Button
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
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>{selectedPlayer?.name}'s skills</DialogTitle>
                <DialogContent>
                    {selectedPlayer?.skills.map((s) => {
                        <DialogContentText>
                            skill: {s.skill} rating: {s.rating}
                        </DialogContentText>
                    })}
                    <DialogContentText>
                        Assign this player a new rating?
                    </DialogContentText>
                    <TextField id='skill' label='Skill' variant='outlined' onChange={handleSkillChange} fullWidth />
                    <TextField id='rating' label='Rating' variant='outlined' onChange={handleRatingChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='primary'>
                        Cancel
                    </Button>
                    <Button
                        id=''
                        variant='outlined'
                        color='primary'
                        onClick={rateSkill}
                    >Rate</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RecruiterDashboard;