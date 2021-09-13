import { useEffect, useState } from "react"
import { Exercise } from "../dtos/exercise"
import { getAllExercises } from "../remote/exercise-service"
import ExerciseListComponent from "./ExerciseListComponent"


function WorkoutComponent() {
    const [exercises, setExercises] = useState([] as Exercise[]);
    const [haveExercises, setHaveExercises] = useState(false);

    let getExercises = async () => {
        let response = await getAllExercises();
        setExercises(response);
    }

    useEffect(() => {
        getExercises();
    }, [haveExercises])

    let checkExercises = () => {
        if (!haveExercises) {
            setHaveExercises(true)
        }
    }
    
    useEffect(() => {
        checkExercises();
    })


    return (
        <>
            <ExerciseListComponent exercises={exercises} />
        </>
    )
}

export default WorkoutComponent