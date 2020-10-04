import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage, useIntl} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useState} from "react";
import PropTypes from "prop-types";

export default function DocumentsForm(props) {
  const intl = useIntl();


  React.useEffect(() => {
    if (props.document) {
      setName(props.document.name);
    }
  }, [props.document]);

  const [name, setName] = useState("");
  console.log(name);

  const handleCancel = (e) => {
    props.closeDialog();
    // setFormDialog({open: false, edit: false});
  };
  const handleSave = (e) => {
    e.preventDefault();
    // console.log(formDialog);
    if (props.edit) {
      props.updateDocument(props.document, name);
    } else {
      props.addDocument(name);
    }
    setName("");
    props.closeDialog();
  };

  return <Dialog open={props.open} onClose={handleCancel}>
    <form onSubmit={handleSave}>
      <DialogTitle>
        {props.edit ? (
          <FormattedMessage
            id={"documents.headings.editDocument"}
            defaultMessage={"Edit document"}
          />
        ) : (
          <FormattedMessage
            id={"documents.headings.addDocument"}
            defaultMessage={"Add a new document"}
          />
        )}
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            label={intl.formatMessage({
              id: "documents.labels.title",
              defaultMessage: "Title"
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant={"outlined"}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="danger">
          <FormattedMessage
            id={"documents.buttons.cancel"}
            defaultMessage={"Cancel"}
          />
        </Button>
        <Button type="submit" color="primary">
          <FormattedMessage
            id={"documents.buttons.save"}
            defaultMessage={"Save document"}
          />
        </Button>
      </DialogActions>
    </form>
  </Dialog>;
}


DocumentsForm.defaults = {
  edit: false
};
DocumentsForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  document: PropTypes.object
};