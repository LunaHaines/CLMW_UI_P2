import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { Color } from '@material-ui/lab/Alert'
import { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router";
import { getAllPlayers, modifyOffer} from "../remote/player-service";
import { Principal } from '../dtos/principal';
import { PlayerRequest } from "../dtos/player-request";
import { getAuthorizedCoach } from "../remote/coach-service";
import {Redirect} from "react-router-dom";

interface ICoachDashboardProps {
    authUser: Principal | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

function CoachDashboardComponent(props: ICoachDashboardProps) {

    const classes = useStyles();
    const [players, setPlayers] = useState(undefined);

    let modifyOfferOnClick = async (coachUsername: string, playerUsername: string, type: string) => {
        try {
            await modifyOffer(coachUsername, playerUsername, type); //FIXME
            setPlayers(undefined);
        } catch (e: any){
        }
    }
     let getPlayers = async () => {
         if(!players && props.authUser){
             try{
             //Get all players that have the same sport as the Coach
              let currentCoach = await getAuthorizedCoach(props.authUser.username);
              let playersRequest = await getAllPlayers(currentCoach.sport);
              playersRequest = playersRequest.filter( (player:any) => (player.teamName === null) )
              //Filter the player objects into username/name.
              //If they have an active offer from the coach, allow the coach to cancel the offer.
              //Otherwise, allow them to extend an offer.
              playersRequest = playersRequest?.map(
                                                (player:any, index:any) =>
                                                       (
                                                        <tr key={index}>
                                                          {player.offers.includes(props.authUser?.username!)
                                                          ? (<Button
                                                              id='rescind-offer-button'
                                                              onClick={() => modifyOfferOnClick(props.authUser?.username!, player.username, 'rescind')}
                                                              variant='contained'
                                                              color='primary'
                                                              size='medium'
                                                            >Cancel Invitation</Button>)
                                                          : (<Button
                                                              id='extend-offer-button'
                                                              onClick={() => modifyOfferOnClick(props.authUser?.username!, player.username, 'extend')}
                                                              variant='contained'
                                                              color='primary'
                                                              size='medium'
                                                          >Invite Player</Button>)
                                                          }
                                                         <td>{player.name}</td>
                                                         <td>{player.username}</td>
                                                         <td>{player.skills.map((s: {skill: string, rating: number}) => { return (<><i>Skill:</i> {s.skill} <i>Rating:</i> {s.rating}</>)})}</td>
                                                        </tr>
                                                      )
                                                );
              setPlayers(playersRequest);
              }
              catch(err){
                 console.log(err);
              }
          }
      }

     getPlayers();

    return(
            !props.authUser ?  <Redirect to="/login"/> :
            <>
            <div style={{ height: 580, width: '95%' }} className={classes.root} >
                <h1 id='title'>Available students</h1>
                <table id='students'>
                   <tbody>
                      {players}
                   </tbody>
                </table>
             </div>
            </>
        )
}

export default CoachDashboardComponent;