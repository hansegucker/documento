import React from "react";
import {useStyles} from "../styles";
import {Button} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import {locale} from "../actions";
import {locales} from "../helper";
import {Locale} from "../types";
import {Dispatch} from "redux";

interface LanguageSelectProps {
  locale: Locale;
  switchLocale: (id: string) => Dispatch;
}
function LanguageSelect(props: LanguageSelectProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent, locale: Locale) => {
    console.log(locale);
    props.switchLocale(locale.id);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} variant={"outlined"}>
        <img
          src={"/static/" + props.locale.flag}
          alt={"Flag of " + props.locale.id}
          className={classes.flag}
        />
        {props.locale.shortcode}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {Object.values(locales).map((locale) => (
          <MenuItem
            key={locale.id}
            selected={locale.id === props.locale.id}
            onClick={(event) => handleMenuItemClick(event, locale)}>
            <img
              src={"/static/" + locale.flag}
              alt={"Flag of " + locale.id}
              className={classes.flag}
            />
            {locale.shortcode}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const mapStateToProps = (state: {locale: Locale}) => {
  return {
    locale: state.locale,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    switchLocale: (id: string) => {
      return dispatch(locale.switchLocale(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
