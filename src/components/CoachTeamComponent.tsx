import { Button, Typography } from "@material-ui/core";
import { PlayCircleOutlineRounded } from "@material-ui/icons";

interface ICoachTeamProps {
    playerNames: string[][]
}

function CoachTeamComponent(props: ICoachTeamProps) {
    
    let comparePositions = (player1Info: string[], player2Info: string[]) => {
        if (player1Info[1] > player2Info[1]) {
            return 1;
        } else if (player1Info[1] < player2Info[1]) {
            return -1;
        } else {
            return 0;
        }
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
                        size='small'>
                        <Typography variant='body1'>assign position</Typography>
                    </Button>
                    <br/><br/>
                </>
            })}
        </>
    )
}

export default CoachTeamComponent;