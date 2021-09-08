import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, useTheme } from "@material-ui/core";
import { DirectionsRunRounded } from "@material-ui/icons";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Principal } from "../dtos/principal";

interface ISidebarProps {
    authUser: Principal | undefined,
    setDrawerOpen: (drawerOpen: boolean) => void
}

function SidebarComponent(props: ISidebarProps) {
    const theme = useTheme();

    let handleDrawerClose = () => {
        props.setDrawerOpen(false);
    }

    return (
        (!props.authUser) ?
        <>
        </>
        : (props.authUser.role === 'coach') ?
        <>
            <Drawer variant='permanent'>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <Divider />
                <List>
                    {['Team', 'Workouts', 'Players'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <DirectionsRunRounded />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
        :
        <>
        </>
    )
}

export default SidebarComponent;