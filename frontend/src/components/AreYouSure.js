import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import PropTypes from "prop-types";

function AreYouSure(props) {
  const handleCancel = (e) => {
    props.doCancel();
    props.closeDialog();
  };
  const handleOK = (e) => {
    e.preventDefault();
    props.doOK();

    props.closeDialog();
  };

  return (
    <Dialog open={props.open} onClose={handleCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="danger">
          <FormattedMessage
            id={"areyousure.buttons.cancel"}
            defaultMessage={"No, cancel"}
          />
        </Button>
        <Button onClick={handleOK} color="primary">
          <FormattedMessage
            id={"areyousure.buttons.ok"}
            defaultMessage={"Yes, I'm sure"}
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AreYouSure.defaults = {
  content: "",
};
AreYouSure.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  doOK: PropTypes.func.isRequired,
  doCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default AreYouSure;
