import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {documents, auth, categories} from "../actions";
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
import {Dispatch} from "redux";
import {Category, DDocument, User} from "../types";

interface DocumentsProps {
  fetchDocuments: () => Dispatch;
  printReport: (id: number, report: string) => Promise<object>;
  fetchCategories: () => Dispatch;
  addDocument: (name: string, file: File, category: number | null) => Dispatch;
  updateDocument: (
    id: number,
    name: string,
    category: number | null
  ) => Dispatch;
  deleteDocument: (id: number) => Dispatch;
  logout: () => Dispatch;
  documents: DDocument[];
  categories: Category[];
  user: User;
}

function Documents(props: DocumentsProps) {
  const classes = useStyles();

  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    edit: boolean;
    document?: DDocument;
  }>({open: false, edit: false});
  const [snackbar, setSnackbar] = useState("");

  const closeSnackbar = (e: React.SyntheticEvent) => {
    setSnackbar("");
  };
  useEffect(() => {
    props.fetchDocuments();
    props.fetchCategories();
  }, [props.user]);

  const openAddDocument = (e: React.MouseEvent) => {
    setFormDialog({open: true, edit: false});
  };

  const openEditDocument: (document: DDocument) => any = (
    document: DDocument
  ) => {
    setFormDialog({open: true, edit: true, document: document});
  };

  const printReport = (id: number, report: string) => {
    props.printReport(id, report).then(function (res: object) {
      console.log("res", res);
      if (res) {
        setSnackbar("success_print");
      }
    });
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
      <Snackbar
        open={snackbar === "success_delete"}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success">
          <FormattedMessage
            id={"documents.texts.documentDeleted"}
            defaultMessage={"The document was deleted successfully."}
          />
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbar === "success_print"}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success">
          <FormattedMessage
            id={"documents.texts.printJobStarted"}
            defaultMessage={"The print job was started successfully."}
          />
        </Alert>
      </Snackbar>

      <DocumentsForm
        closeDialog={() => setFormDialog({open: false, edit: false})}
        open={formDialog.open}
        edit={formDialog.edit}
        document={formDialog.document}
        updateDocument={(document, name, category) => {
          props.updateDocument(document.id, name, category);
          setSnackbar("success");
        }}
        addDocument={(name, file, category) => {
          props.addDocument(name, file, category);
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
        <FormattedMessage
          id={"documents.buttons.addDocument"}
          defaultMessage={"Add document"}
        />
      </Button>

      <DocumentsTable
        editDocument={openEditDocument}
        deleteDocument={(document: DDocument) => {
          props.deleteDocument(document.id);
          setSnackbar("success_delete");
        }}
        printReport={printReport}
        documents={props.documents}
      />
    </div>
  );
}

interface DocumentsState {
  documents: DDocument[];
  categories: Category[];
  auth: {user: User};
}
const mapStateToProps = (state: DocumentsState) => {
  return {
    documents: state.documents,
    categories: state.categories,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchDocuments: () => {
      return dispatch(documents.fetchDocuments());
    },
    printReport: (id: number, report: string) => {
      return dispatch(documents.printReport(id, report));
    },
    fetchCategories: () => {
      return dispatch(categories.fetchCategories());
    },
    addDocument: (name: string, file: File, category: number | null) => {
      return dispatch(documents.addDocument(name, file, category));
    },
    updateDocument: (id: number, name: string, category: number | null) => {
      return dispatch(documents.updateDocument(id, name, category));
    },
    deleteDocument: (id: number) => {
      return dispatch(documents.deleteDocument(id));
    },
    logout: () => dispatch(auth.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
