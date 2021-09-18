import { Exercise } from '../../dtos/exercise';
import { DataGrid, GridColDef, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { assignExercise } from '../../remote/coach-service';

interface IExerciseListProps {
    exercises: Exercise[],
    user: string | undefined
}

const renderDetailsButton = (params: any) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    assignExercise(params.row.name, user);             //Check for throw and alert if not added 
                    alert(`Assigned ${params.row.name} to your team!`);
                }}
            >
                ASSIGN
            </Button>
        </strong>
    )
}

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Exercise',
        flex: 2
    },
    {
        field: 'bodyPart',
        headerName: 'Body Part',
        flex: 1
    },
    {
        field: 'equipment',
        headerName: 'Equipment',
        flex: 1
    },
    {
        field: 'target',
        headerName: 'Target',
        flex: .5
    },
    {
        field: 'assign',
        headerName: 'Assign',
        flex: .5,
        renderCell: renderDetailsButton
    }
]


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

var user: string;

function ExerciseListComponent(props: IExerciseListProps) {
    
    const rows = props.exercises;
    const classes = useStyles();
    
    user = useState(props.user as string)[0];
    
    return (
        <>
            <div style={{ height: 580, width: '95%' }} className={classes.root} >
                <DataGrid
                    components={{
                        Toolbar: GridToolbarFilterButton
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                />
            </div>
        </>
    )
}

export default ExerciseListComponent;