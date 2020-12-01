import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import PropTypes from "prop-types";

interface AreYouSureProps {
  closeDialog: () => any;
  doOK: () => any;
  doCancel: () => any;
  open: boolean;
  title: string;
  content?: string;
}
function AreYouSure(props: AreYouSureProps) {
  const handleCancel = (event: React.MouseEvent) => {
    props.doCancel();
    props.closeDialog();
  };
  const handleOK = (event: React.MouseEvent) => {
    event.preventDefault();
    props.doOK();

    props.closeDialog();
  };

  return (
    <Dialog open={props.open} onClose={handleCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
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
