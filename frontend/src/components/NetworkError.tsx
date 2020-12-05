import Alert from "@material-ui/lab/Alert";
import {FormattedMessage} from "react-intl";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

interface NetworkErrorProps {
  open: boolean;
  onClose: () => any;
}
export default function NetworkError(props: NetworkErrorProps) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={() => props.onClose()}>
      <Alert onClose={() => props.onClose()} severity="error">
        <FormattedMessage
          id={"app.texts.network-error"}
          defaultMessage={"There was a network or server error."}
        />
      </Alert>
    </Snackbar>
  );
}
