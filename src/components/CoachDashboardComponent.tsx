import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { Color } from '@material-ui/lab/Alert'
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAllPlayers } from "../remote/player-service";
import { Principal } from '../dtos/principal';
import { PlayerRequest } from "../dtos/player-request";

interface ICoachDashboardProps {
    currentUser: Principal | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(12)
        }
    }))

function CoachDashboardComponent(props: ICoachDashboardProps) {

    const classes = useStyles();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
         let getPlayers = async () => {
             try{
              let playersRequest = await getAllPlayers();
              playersRequest = playersRequest?.map(
                                                (player:any, index:any) =>
                                                       (
                                                        <tr key={index}>
                                                         <td>{player.name}</td>
                                                         <td>{player.username}</td>
                                                        </tr>
                                                      )
                                                );
              setPlayers(playersRequest);
              }
              catch(err){
                 console.log(err);
              }
          }
          getPlayers();
    });

    return(
            <>
             <div>
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