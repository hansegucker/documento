import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {documents, auth} from "../actions";
import {FormattedMessage, useIntl} from 'react-intl'
import {useStyles} from "../styles";
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Add, Delete, Edit} from "@material-ui/icons";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Documents(props) {
    const intl = useIntl();
    const classes = useStyles();

    const [name, setName] = useState("");
    const [formDialog, setFormDialog] = useState({open: false, edit: false});
    const [snackbar, setSnackbar] = useState("");

    const closeSnackbar = (e) => {
        setSnackbar("");
    };
    useEffect(() => {
        props.fetchDocuments();
    }, [props.user]);


    const handleCancel = (e) => {
        setFormDialog({open: false, edit: false});
    };
    const handleSave = (e) => {
        e.preventDefault();
        console.log(formDialog);
        if (formDialog.edit) {
            props.updateDocument(formDialog.document.idx, name);
        } else {
            props.addDocument(name);
        }
        setName("");
        setFormDialog({open: false, edit: false});
        setSnackbar("success");
    };

    const openAddDocument = (e) => {
        setFormDialog({open: true, edit: false});
    }

    const openEditDocument = (e, document) => {
        setName(document.name);
        setFormDialog({open: true, edit: true, document: document});
    }
    return (
        <div>
            <Snackbar open={snackbar === "success"}
                      autoHideDuration={2000}
                      onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
                    <FormattedMessage id={"documents.texts.document-success"}
                                      defaultMessage={"The document was saved successfully."}/>
                </Alert>
            </Snackbar>

            <Dialog open={formDialog.open} onClose={handleCancel}>
                <form onSubmit={handleSave}>
                    <DialogTitle>
                        {formDialog.edit ?
                            <FormattedMessage id={"documents.editDocument"} defaultMessage={"Edit document"}/> :
                            <FormattedMessage id={"documents.addDocument"} defaultMessage={"Add a new document"}/>}
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
                                variant={"outlined"}/>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="danger">
                            <FormattedMessage id={"documents.buttons.cancel"} defaultMessage={"Cancel"}/>
                        </Button>
                        <Button type="submit" color="primary">
                            <FormattedMessage id={"documents.buttons.save"} defaultMessage={"Save document"}/>
                        </Button>
                    </DialogActions></form>

            </Dialog>

            <Card className={classes.cardMediaLeft + " " + classes.marginBottom}>
                <CardMedia
                    image="/static/documents.jpg"
                    style={{width: "30%"}}
                />
                <CardContent>
                    <Typography variant={"h5"} component={"h1"}><FormattedMessage
                        id="documents.texts.welcome-message" description="welcome message"
                        defaultMessage="Welcome to documento!"/></Typography>
                </CardContent>
            </Card>

            <Button variant={"contained"} color={"primary"} startIcon={<Add/>} onClick={openAddDocument}
                    className={classes.marginBottomSmall}>
                Add document
            </Button>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell align={"right"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.documents.map((document, idx) => (
                            <TableRow key={document.id}>
                                <TableCell>
                                    <code>{document.id}</code>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {document.name}
                                </TableCell>
                                <TableCell align="right">
                                    <ButtonGroup color="primary" aria-label="outlined primary button group"
                                                 size="small">
                                        <Button onClick={(e) => openEditDocument(e, {...document, idx})}>
                                            <Edit/>
                                        </Button>
                                        <Button onClick={() => props.deleteDocument(idx)}>
                                            <Delete/>
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        documents: state.documents,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDocuments: () => {
            return dispatch(documents.fetchDocuments());
        },
        addDocument: (name) => {
            return dispatch(documents.addDocument(name));
        },
        updateDocument: (idx, name) => {
            return dispatch(documents.updateDocument(idx, name));
        },
        deleteDocument: (idx) => {
            return dispatch(documents.deleteDocument(idx));
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);