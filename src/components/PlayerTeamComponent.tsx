import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, makeStyles, Modal, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { Color } from '@material-ui/lab/Alert';
import { createStyles } from "@material-ui/styles";
import { useState } from "react";
import { Coach } from "../dtos/coach";
import { Principal } from "../dtos/principal";
import { getPlayerTeam } from "../remote/coach-service";
import { getAuthorizedPlayer } from "../remote/player-service";
import { Offer } from "../dtos/offer";
import { removePlayer } from "../remote/coach-service";

interface IPlayerTeamProps {
    authUser: Principal | undefined
    errorOpen: boolean,
    setErrorOpen: (openValue: boolean) => void,
    errorMessage: string,
    setErrorMessage: (newMessage: string) => void,
    errorSeverity: Color | undefined,
    setErrorSeverity: (newSeverity: Color | undefined) => void
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

function PlayerTeamComponent(props: IPlayerTeamProps) {
    const [team, setTeam] = useState(undefined as Coach | undefined)
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    let getTeam = async () => {
        if (props.authUser) {
            if (!team) {
                try{
                    let foundTeam = await getPlayerTeam(props.authUser.username);
                    setTeam(foundTeam);
                    }
                    catch(e: any){
                        console.log(e.message);
                    }
            }
        }
    }



    //Remove Dialog

    let promptLeave = (playerUsername: string) => {
        setAlertOpen(true);
    }

    let handleConfirm = async (e: any) => {
        if(props.authUser){
            let userInfo = await getAuthorizedPlayer(props.authUser.username);
            let remove: Offer = new Offer(team?.username!, props.authUser.username);
            try{
                await removePlayer(remove);
                //Rerender the page after removing
                setTeam(undefined);
            } catch(e: any) {
                props.setErrorOpen(true);
                props.setErrorSeverity('error');
                props.setErrorMessage(e.response?.data.message);
            }

        }
        //close dialog
        setAlertOpen(false);
    }

    let handleAlertClose = () => {
        setAlertOpen(false);
    }



    const classes = useStyles();

    getTeam();


    return (
            team ?
            <div className={classes.root}>
                <Typography variant='h2'>Hello, {team?.teamName}</Typography>
                <br/><br/>
                <Typography variant='h4'>Team Members:</Typography>
                <br/><br/>
                <Typography variant='body1'><b>Coach:</b> {team?.coachName}</Typography>
                <br/>
                {team?.players.map((player) => {
                    return (
                        <>
                            <Typography variant='body1'><b>{player[0]}</b>: {player[1]}</Typography>
                            <br/>
                        </>
                    )
                })}
                <Button
                    id={props?.authUser?.username!}
                    key={props?.authUser?.username!}
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => {promptLeave(props?.authUser?.username!)}}
                >
                    <Typography variant='body1'>Leave Team</Typography>
                </Button>
            <div>
                <Dialog open={alertOpen} onClose={handleAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Leave Team?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to leave the team?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleConfirm} color="secondary" variant="contained" autoFocus>
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
            :
            <div className={classes.root}>
                <Typography variant= 'h4'>You are not on a team</Typography>
            </div>
    )
}

export default PlayerTeamComponent;