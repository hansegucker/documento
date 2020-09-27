import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "./components/Drawer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        },
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appToolbar: {
        justifyContent: "space-between"
    },
    appBarRight: {
        display: "flex",
        alignItems: "center"
    },
    cardMediaLeft: {
        display: "flex"
    },
    marginBottom: {
        marginBottom: "20px"
    },
    marginBottomSmall: {
        marginBottom: "10px"
    },
    loginContainer: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/static/archive.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    loginCard: {
        maxWidth: "400px"
    },
    fullWidth: {
        width: "100%"
    }
}));


export {useStyles};