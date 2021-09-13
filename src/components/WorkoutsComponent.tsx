import { useState } from "react"
import { Exercise } from "../dtos/exercise"
import { getAllExercises } from "../remote/exercise-service"
import ExerciseListComponent from "./ExerciseListComponent"


function WorkoutComponent() {
    const [exercises, setExercises] = useState([] as Exercise[])

    let getExercises = async () => {
        let response = await getAllExercises();
        setExercises(response);
    }

    getExercises();

    return (
        <>
            <ExerciseListComponent exercises={exercises} />
        </>
    )
}

export default WorkoutComponent