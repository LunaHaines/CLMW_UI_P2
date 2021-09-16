import { createStyles } from "@material-ui/styles";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { useState } from "react";
import { Coach } from "../dtos/coach";
import { Principal } from "../dtos/principal";
import { getPlayerTeam } from "../remote/coach-service";
import { getAuthorizedPlayer } from "../remote/player-service";

interface IPlayerTeamProps {
    authUser: Principal | undefined
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
        </div> 
        :
        <div className={classes.root}>
            <Typography variant= 'h4'>You are not on a team</Typography>
        </div>
    )
}

export default PlayerTeamComponent;