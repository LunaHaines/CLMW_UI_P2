import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { Coach } from "../dtos/coach";
import { Principal } from "../dtos/principal";
import { getPlayerTeam } from "../remote/coach-service";
import { getAuthorizedPlayer, modifyExercise } from "../remote/player-service";
import {Redirect} from "react-router-dom";
import { Player } from "../dtos/player";

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

function PlayerWorkoutComponent(props: IPlayerTeamProps) {
    const [player, setPlayer] = useState(undefined as Player | undefined);
    const [exercises, setExercises] = useState(undefined);
    const [completedExercises, setCompletedExercises] = useState(undefined);

    let modifyExerciseOnClick = async (playerUsername: string, exercise: string, type: string) => {
        try {
            await modifyExercise(playerUsername, exercise, type);
            setPlayer(undefined);
        } catch (e: any){
        }
    }

    let getWorkouts = async () => {
        if (props.authUser) {
            if (!player) {
                try{
                    let findPlayer = await getAuthorizedPlayer(props.authUser.username);
                    setPlayer(findPlayer);
                    let exercises = findPlayer?.exercises;
                    if(exercises) exercises = exercises.map( (exercise:any, index:any) =>
                           (
                            <tr key={index}>
                              <Button
                                  id='complete-exercise-button'
                                  onClick={() => modifyExerciseOnClick(props.authUser?.username!, exercise, 'complete')}
                                  variant='contained'
                                  color='primary'
                                  size='medium'
                              >Mark as Completed</Button>
                             <td>{exercise}</td>
                            </tr>
                          )
                    );
                    setExercises(exercises);

                    let completedExercises = findPlayer?.completedExercises;
                    if(completedExercises) completedExercises = completedExercises.map( (exercise:any, index:any) =>
                           (
                            <tr key={index}>
                              <Button
                                  id='uncomplete-exercise-button'
                                  onClick={() => modifyExerciseOnClick(props.authUser?.username!, exercise, 'uncomplete')}
                                  variant='contained'
                                  color='primary'
                                  size='medium'
                              >Mark as To-Do</Button>
                             <td>{exercise}</td>
                            </tr>
                          )
                    );
                    setCompletedExercises(completedExercises);

                    }
                    catch(e: any){
                        console.log(e.message);
                    }
            }
        }
    }

    const classes = useStyles();

    getWorkouts();

    return (
        <div className={classes.root}>
            {
                (player)
                ?
                (player?.exercises?.length > 0 || player?.completedExercises?.length > 0)
                ?
                <div style={{ height: 580, width: '95%' }} className={classes.root} >
                    <h1 id='title'>Exercises</h1>
                    <table id='students'>
                       <tbody>
                            {
                                exercises
                            }
                       </tbody>
                    </table>
                     <h1 id='title'>Completed Exercises</h1>
                     <table id='students'>
                        <tbody>
                             {
                                 completedExercises
                             }
                        </tbody>
                     </table>
                 </div>
                :
                <Typography variant='h4'>You don't have any current exercises</Typography>
                :
                <Typography variant='h5'>.</Typography>
            }
        </div>
    )
}

export default PlayerWorkoutComponent;