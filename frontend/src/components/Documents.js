import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {documents, auth} from "../actions";
import {FormattedMessage} from "react-intl";
import {useStyles} from "../styles";
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DocumentsTable from "./DocumentsTable";
import DocumentsForm from "./DocumentsForm";

function Documents(props) {
  const classes = useStyles();

  const [formDialog, setFormDialog] = useState({open: false, edit: false});
  const [snackbar, setSnackbar] = useState("");

  const closeSnackbar = (e) => {
    setSnackbar("");
  };
  useEffect(() => {
    props.fetchDocuments();
  }, [props.user]);

  const openAddDocument = (e) => {
    setFormDialog({open: true, edit: false});
  };

  const openEditDocument = (document) => {
    setFormDialog({open: true, edit: true, document: document});
  };

  return (
    <div>
      <Snackbar
        open={snackbar === "success"}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success">
          <FormattedMessage
            id={"documents.texts.document-success"}
            defaultMessage={"The document was saved successfully."}
          />
        </Alert>
      </Snackbar>

      <DocumentsForm
        closeDialog={() => setFormDialog({open: false, edit: false})}
        open={formDialog.open}
        edit={formDialog.edit}
        document={formDialog.document}
        updateDocument={(document, name) => {
          props.updateDocument(document.idx, name);
          setSnackbar("success");
        }}
        addDocument={(name, file) => {
          props.addDocument(name, file);
          setSnackbar("success");
        }}
      />

      <Card className={classes.cardMediaLeft + " " + classes.marginBottom}>
        <CardMedia image="/static/documents.jpg" style={{width: "30%"}} />
        <CardContent>
          <Typography variant={"h5"} component={"h1"}>
            <FormattedMessage
              id="documents.texts.welcome-message"
              description="welcome message"
              defaultMessage="Welcome to documento!"
            />
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant={"contained"}
        color={"primary"}
        startIcon={<Add />}
        onClick={openAddDocument}
        className={classes.marginBottomSmall}>
        Add document
      </Button>

      <DocumentsTable
        editDocument={openEditDocument}
        deleteDocument={(document) => props.deleteDocument(document.idx)}
        documents={props.documents}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDocuments: () => {
      return dispatch(documents.fetchDocuments());
    },
    addDocument: (name, file) => {
      return dispatch(documents.addDocument(name, file));
    },
    updateDocument: (idx, name) => {
      return dispatch(documents.updateDocument(idx, name));
    },
    deleteDocument: (idx) => {
      return dispatch(documents.deleteDocument(idx));
    },
    logout: () => dispatch(auth.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
