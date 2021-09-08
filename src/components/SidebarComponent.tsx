import { Divider, Drawer, IconButton, List, useTheme } from "@material-ui/core";
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
        <>
            <Drawer variant='permanent'>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <Divider />
                <List>
                </List>
            </Drawer>
        </>
    )
}

export default SidebarComponent;