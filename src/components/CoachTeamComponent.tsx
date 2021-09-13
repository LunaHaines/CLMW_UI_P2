import { Backdrop, Button, Fade, Modal, Paper, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { PositionRequest } from "../dtos/position-request";
import { Principal } from "../dtos/principal";
import { assignPlayerPosition, getAuthorizedCoach } from "../remote/coach-service";

interface ICoachTeamProps {
    authUser: Principal | undefined
}

function CoachTeamComponent(props: ICoachTeamProps) {
    const [playerNames, setPlayerNames] = useState([] as string[][]);
    const [selectedPlayerUsername, setSelectedPlayerUsername] = useState('');
    const [positionInput, setPositionInput] = useState('');
    const [open, setOpen] = useState(false);

    let getPlayers = async () => {
        if (props.authUser) {
            if (!playerNames) {
                let resp = await getAuthorizedCoach(props.authUser.username)
                setPlayerNames(resp.players)
            }
        }
    }

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

    let assignPosition = async () => {
        try {
            if (props.authUser) {
                let request: PositionRequest = new PositionRequest(props.authUser.username, selectedPlayerUsername, positionInput);
                await assignPlayerPosition(request);
                let resp = await getAuthorizedCoach(props.authUser.username)
                setPlayerNames(resp.players)
            }
        } catch (e: any) {
            console.log(e);
            
        }

    }

    let handleClose = () => {
        setOpen(false);
    }

    let handleChange = (e: any) => {
        setPositionInput(e.target)
    }

    useEffect(() => {getPlayers();});

    return (
        <>
            {playerNames?.sort(comparePositions).map((playerInfo) => {
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