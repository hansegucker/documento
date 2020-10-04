import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Delete, Edit} from "@material-ui/icons";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";
import {useStyles} from "../styles";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

export default function DocumentsTable(props) {
  const classes = useStyles();
  return <TableContainer component={Paper}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell><FormattedMessage id={"documents.headings.title"} defaultMessage={"Title"}/></TableCell>
          <TableCell align={"right"}><FormattedMessage id={"documents.headings.title"} defaultMessage={"Actions"}/></TableCell>
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
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                size="small">
                <Button
                  onClick={() => props.editDocument({...document, idx})}>
                  <Edit />
                </Button>
                <Button onClick={() => props.deleteDocument({...document, idx})}>
                  <Delete />
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>;
}

DocumentsTable.propTypes = {
  editDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired
};