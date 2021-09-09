import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { DirectionsRunRounded, PeopleRounded, PersonRounded } from "@material-ui/icons";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Principal } from "../dtos/principal";
import clsx from 'clsx';

interface ISidebarProps {
    authUser: Principal | undefined,
    drawerOpen: boolean,
    setDrawerOpen: (drawerOpen: boolean) => void
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0,1),
            ...theme.mixins.toolbar
        }
    })
)

function SidebarComponent(props: ISidebarProps) {
    const theme = useTheme();

    let handleDrawerClose = () => {
        props.setDrawerOpen(false);
    }

    const classes = useStyles();

    return (
        <>
            <Drawer variant='permanent' className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.drawerOpen,
                [classes.drawerClose]: !props.drawerOpen
            })} classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.drawerOpen,
                    [classes.drawerClose]: !props.drawerOpen
                })
            }}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key='Team'>
                        <ListItemIcon>
                            <PeopleRounded />
                        </ListItemIcon>
                        <ListItemText primary='Team' />
                    </ListItem>
                    <ListItem button key='Workouts'>
                        <ListItemIcon>
                            <DirectionsRunRounded />
                        </ListItemIcon>
                        <ListItemText primary='Workouts' />
                    </ListItem>
                    <ListItem button key='Players'>
                        <ListItemIcon>
                            <PersonRounded />
                        </ListItemIcon>
                        <ListItemText primary='Players' />
                    </ListItem>'
                </List>
            </Drawer>
        </>
    )
}

export default SidebarComponent;