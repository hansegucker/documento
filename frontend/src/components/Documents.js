import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {documents, auth} from "../actions";
import {FormattedMessage, useIntl} from 'react-intl'
import Header from "./Header";
import {useStyles} from "../styles";
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {DataGrid} from "@material-ui/data-grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Delete, Edit} from "@material-ui/icons";

function Documents(props) {
    const intl = useIntl();
    const classes = useStyles();

    const [name, setName] = useState("");
    useEffect(() => {
        props.fetchDocuments();
    }, [props.user]);

    const addDocument = (e) => {
        e.preventDefault();
        props.addDocument(name);
        setName("");
    };
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
    ];
    return (
        <div>
            <Header/>
            <div className={classes.toolbar}/>
            <main className={classes.content}>
                <Card className={classes.cardMediaLeft + " " + classes.marginBottom}>
                    <CardMedia
                        image="/static/documents.jpg"
                        title="Live from space album cover"
                        style={{width: "30%"}}
                    />
                    <CardContent>
                        <Typography variant={"h5"} component={"h1"}><FormattedMessage
                            id="documents.texts.welcome-message" description="welcome message"
                            defaultMessage="Welcome to documento!"/></Typography>
                    </CardContent>
                </Card>

                <Card className={classes.marginBottom}>
                    <CardContent>
                        <form onSubmit={addDocument}>
                            <Typography variant={"h5"} component={"h2"} className={classes.marginBottomSmall}>
                                <FormattedMessage id={"documents.addDocument"} defaultMessage={"Add a new document"}/>
                            </Typography>
                            <div className={classes.marginBottomSmall}>
                                <TextField
                                    label={intl.formatMessage({
                                        id: "documents.placeholders.enter-title",
                                        defaultMessage: "Enter title ..."
                                    })}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    variant={"outlined"}/>
                            </div>

                            <div>
                                <Button variant="contained" color="primary" type="submit">
                                    <FormattedMessage id={"documents.buttons.save"} defaultMessage={"Save document"}/>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.documents.map((document, id) => (
                                <TableRow key={document.name}>
                                    <TableCell component="th" scope="row">
                                        {document.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup color="primary" aria-label="outlined primary button group"
                                                     size="small">
                                            <Button>
                                                <Edit/>
                                            </Button>
                                            <Button onClick={() => props.deleteDocument(id)}>
                                                <Delete/>
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
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
        updateDocument: (id, name) => {
            return dispatch(documents.updateDocument(id, name));
        },
        deleteDocument: (id) => {
            return dispatch(documents.deleteDocument(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);