import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import React, {useState} from "react";
import MainDrawer from "./Drawer";
import {useStyles} from "../styles";
import {useTheme} from "@material-ui/core";
import {auth} from "../actions";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import Button from "@material-ui/core/Button";
import {DDocument, User} from "../types";
import {Dispatch} from "redux";

interface HeaderOwnProps {}
interface HeaderProps extends HeaderOwnProps {
  documents: DDocument[];
  user: User;
  logout: () => Dispatch;
}
function Header(props: HeaderProps) {
  const [mobileOpen, handleDrawerToggle] = useState(false);
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => handleDrawerToggle(!mobileOpen)}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Documento
          </Typography>

          <div className={classes.appBarRight}>
            <Typography>
              <FormattedMessage
                id={"app.loggedInAs"}
                defaultMessage={"Logged in as {username}"}
                values={{username: props.user.username}}
              />
            </Typography>
            <Button onClick={props.logout} color={"inherit"}>
              <FormattedMessage
                id={"app.buttons.logout"}
                defaultMessage={"Logout"}
              />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            <MainDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            <MainDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

interface HeaderState {
  documents: DDocument[];
  auth: {user: User};
}

const mapStateToProps = (state: HeaderState) => {
  return {
    documents: state.documents,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logout: () => dispatch(auth.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
