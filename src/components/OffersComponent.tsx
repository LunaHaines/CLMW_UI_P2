import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import { Color } from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import { Offer } from "../dtos/offer";
import { Player } from "../dtos/player";
import { Principal } from "../dtos/principal";
import { getAuthorizedPlayer } from "../remote/player-service";
import { acceptOffer } from "../remote/coach-service";
import { SettingsInputComponent } from "@material-ui/icons";

interface IOffersProps {
    authUser: Principal | undefined,
    setOpen: (openValue: boolean) => void,
    setMessage: (newMessage: string) => void,
    setSeverity: (newSeverity: Color | undefined) => void
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

function OffersComponent(props: IOffersProps) {
    const [player, setPlayer] = useState(undefined as Player | undefined);

    let acceptInvite = async (coach: string) => {
        try {
            if (player) {
                let offer = new Offer(coach, player.username);
                await acceptOffer(offer);
                if (props.authUser) {
                    let response = await getAuthorizedPlayer(props.authUser.username);
                    setPlayer(response);
                }
            }
        } catch (e: any) {
            props.setOpen(true);
            props.setMessage(e.response?.data.message);
            props.setSeverity('error');
        }
    }

    let getPlayer = async () => {
        try {
            if (props.authUser) {
                if (!player) {
                    let response = await getAuthorizedPlayer(props.authUser.username);
                    setPlayer(response);
                }
            }
        } catch(e: any) {
            props.setOpen(true);
            props.setMessage(e.response?.data.message);
            props.setSeverity('error');
        }
    }

    useEffect(() => {getPlayer();});

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                (player)
                ?
                (player.offers.length > 0)
                ?
                player.offers.map((offer) => {
                    return (
                    <>
                        <Typography variant='h5'>You have an invitation to join <b>{offer}'s</b> team!</Typography>
                        <Button
                            id={offer}
                            variant='contained'
                            color='primary'
                            onClick={() => {acceptInvite(offer)}}
                        >Accept {offer}'s offer</Button>
                        <br/>
                    </>
                    )
                })
                :
                <Typography variant='h5'>You don't have any current offers</Typography>
                :
                <Typography variant='h5'>Not sure how you got here</Typography>
            }
        </div>
    )
}

export default OffersComponent;