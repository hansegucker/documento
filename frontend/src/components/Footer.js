import React from "react";
import {useStyles} from "../styles";

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      Documento – A web-based document management system. &copy; 2020 by
      Jonathan Weth. Licenced unter the GPL, version 3 or later.
    </footer>
  );
}

export default Footer;
