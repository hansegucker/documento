import React, {useEffect, useState} from "react";
import {Link as RouterLink, useParams, useHistory} from "react-router-dom";
import {documents} from "../actions";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {FormattedMessage, useIntl} from "react-intl";
import {useStyles} from "../styles";
import {PDFObject} from "react-pdfobject";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {CropFree, Delete, Edit} from "@material-ui/icons";
import DocumentsForm from "./DocumentsForm";
import AreYouSure from "./AreYouSure";
import {DDocument, User} from "../types";
import {Dispatch} from "redux";

interface DocumentViewerOwnProps {}

interface DocumentViewerProps extends DocumentViewerOwnProps {
  documents: DDocument[];
  fetchDocuments: () => Dispatch;
  updateDocument: (id: number, name: string) => Dispatch;
  deleteDocument: (id: number) => Dispatch;
  user: User;
}

function DocumentViewer(props: DocumentViewerProps) {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();

  let [formDialog, setFormDialog] = useState({open: false});
  let [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    props.fetchDocuments();
  }, [props.user]);

  const deleteDocument = () => {
    if (document) {
      props.deleteDocument(document.id);
      history.push("/");
    }
  };

  let {id} = useParams<{id: string | undefined}>();
  let idParsed = Number(id) || null;
  let document = idParsed ? props.documents[idParsed] : null;

  return document ? (
    <div>
      <DocumentsForm
        closeDialog={() => setFormDialog({open: false})}
        open={formDialog.open}
        edit={true}
        document={document}
        updateDocument={(document, name) => {
          props.updateDocument(document.id, name);
          // setSnackbar("success");
        }}
        addDocument={(name, file) => {}}
      />
      <AreYouSure
        closeDialog={() => {
          setDeleteDialog(false);
        }}
        doOK={deleteDocument}
        doCancel={() => console.log("")}
        open={deleteDialog}
        title={intl.formatMessage({
          id: "documents.headings.areYouSure",
          defaultMessage: "Are you sure?",
        })}
        content={intl.formatMessage({
          id: "documents.texts.deleteSure",
          defaultMessage:
            "Do you really want to delete this document? You can't make this undone.",
        })}
      />

      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" component={RouterLink} to={"/"}>
          <FormattedMessage
            id={"documents.texts.allDocuments"}
            defaultMessage={"All documents"}
          />
        </Link>
        <Typography color="textPrimary">{document.name}</Typography>
      </Breadcrumbs>
      <div className={classes.actionButtonsDocument}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Tooltip
            title={intl.formatMessage({
              id: "documents.buttons.barcodeLabel",
              defaultMessage: "Barcode label as PDF",
            })}>
            <Button href={document.barcode_label}>
              <CropFree />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage({
              id: "documents.buttons.edit",
              defaultMessage: "Edit document",
            })}>
            <Button onClick={() => setFormDialog({open: true})}>
              <Edit />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage({
              id: "documents.buttons.delete",
              defaultMessage: "Delete document",
            })}>
            <Button onClick={() => setDeleteDialog(true)}>
              <Delete />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <Typography component={"h1"} variant={"h4"}>
        {document.name}
      </Typography>
      <PDFObject url={document.file} />
    </div>
  ) : (
    <div />
  );
}

interface DocumentViewerState {
  auth: {user: User};
  documents: DDocument[];
}

const mapStateToProps = (state: DocumentViewerState) => {
  return {
    user: state.auth.user,
    documents: state.documents,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchDocuments: () => {
      return dispatch(documents.fetchDocuments());
    },
    updateDocument: (id: number, name: string) => {
      return dispatch(documents.updateDocument(id, name));
    },
    deleteDocument: (id: number) => {
      return dispatch(documents.deleteDocument(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewer);
