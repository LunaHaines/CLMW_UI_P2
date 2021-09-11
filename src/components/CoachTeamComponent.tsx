import { Backdrop, Button, Fade, Modal, Paper, TextField, Typography } from "@material-ui/core";
import { PlayCircleOutlineRounded } from "@material-ui/icons";
import { randomInt } from "crypto";
import { useState } from "react";

interface ICoachTeamProps {
    playerNames: string[][]
}

function CoachTeamComponent(props: ICoachTeamProps) {
    const [selectedPlayerUsername, setSelectedPlayerUsername] = useState('');
    const [positionInput, setPositionInput] = useState('');
    const [open, setOpen] = useState(false);

    let comparePositions = (player1Info: string[], player2Info: string[]) => {
        if (player1Info[1] > player2Info[1]) {
            return 1;
        } else if (player1Info[1] < player2Info[1]) {
            return -1;
        } else {
            return 0;
        }
    }

    let showAssignPosition = (playerUsername: string) => {
        setOpen(true);
        setSelectedPlayerUsername(playerUsername);
    }

    let assignPosition = () => {
        // make api call to assign role to player here
    }

    let handleClose = () => {
        setOpen(false);
    }

    let handleChange = (e: any) => {
        setPositionInput(e.target)
    }

    return (
        <>
            {props.playerNames?.sort(comparePositions).map((playerInfo) => {
                <>
                    <Typography variant='h6'>Name: {playerInfo[0]}</Typography>
                    <Typography variant='h6'>Position: {playerInfo[1]}</Typography>
                    <Button
                        id={playerInfo[0]}
                        variant='contained'
                        color='default'
                        size='small'
                        onClick={() => {showAssignPosition(playerInfo[0])}}
                    >
                        <Typography variant='body1'>assign position</Typography>
                    </Button>
                    <br/><br/>
                </>
            })}
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <Fade in={open}>
                    <Paper>
                        <TextField id='position' label='Position' variant='outlined' onChange={handleChange} />
                        <Button
                            id='assign-position'
                            variant='outlined'
                            color='default'
                            size='small'
                            onClick={assignPosition}
                        >
                            <Typography variant='body1'>Assign Role</Typography>
                        </Button>

                    </Paper>
                </Fade>
            </Modal>
                
        </>
    )
}

export default CoachTeamComponent;