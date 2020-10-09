import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "./components/Drawer";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentLogin: {
    height: "100%",
  },
  appToolbar: {
    justifyContent: "space-between",
  },
  appBarRight: {
    display: "flex",
    alignItems: "center",
  },
  cardMediaLeft: {
    display: "flex",
  },
  marginBottom: {
    marginBottom: "20px",
  },
  marginBottomSmall: {
    marginBottom: "10px",
  },
  loginContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/static/archive.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  loginCard: {
    minWidth: "400px",
  },
  fullWidth: {
    width: "100%",
  },
  footer: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
    padding: theme.spacing(3),
  },
  languageSelectContainer: {
    position: "absolute",
    bottom: "20px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  flag: {
    height: "12px",
    marginRight: "10px",
    marginBottom: "1px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileInput: {
    display: "none",
  },
  fileLabel: {
    marginLeft: "10px",
  },
  greenIcon: {
    color: green[500],
    float: "left",
    marginRight: "10px",
  },
  actionButtonsDocument: {
    [theme.breakpoints.up("sm")]: {
      float: "right",
      marginLeft: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      margin: "10px",
    },
  },
}));

export {useStyles};
