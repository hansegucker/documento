import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useStyles} from "../styles";
import LanguageSelect from "./LanguageSelect";
import {Description, Label} from "@material-ui/icons";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

const drawerWidth = 240;

export {drawerWidth};

export default function MainDrawer() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={Link} to={"/"}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id={"menu.documents"}
                defaultMessage={"Documents"}
              />
            }
          />
        </ListItem>
        <ListItem button component={Link} to={"/categories/"}>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id={"menu.categories"}
                defaultMessage={"Categories"}
              />
            }
          />
        </ListItem>
      </List>
      <div className={classes.languageSelectContainer}>
        <LanguageSelect />
      </div>
    </div>
  );
}
