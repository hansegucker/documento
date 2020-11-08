import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {CropFree, Delete, Edit, Print} from "@material-ui/icons";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";
import {useStyles} from "../styles";
import PropTypes from "prop-types";
import {FormattedMessage, useIntl} from "react-intl";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import {connect} from "react-redux";
import CategoryPath from "./CategoryPath";

function DocumentsTable(props) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>
              <FormattedMessage
                id={"documents.headings.category"}
                defaultMessage={"Category"}
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id={"documents.headings.title"}
                defaultMessage={"Title"}
              />
            </TableCell>
            <TableCell align={"right"}>
              <FormattedMessage
                id={"documents.headings.actions"}
                defaultMessage={"Actions"}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(props.documents).map((document) => (
            <TableRow key={document.id}>
              <TableCell>
                <code>{document.id}</code>
              </TableCell>
              <TableCell>
                {document.category &&
                props.categories &&
                document.category in props.categories ? (
                  <CategoryPath
                    category={props.categories[document.category]}
                  />
                ) : (
                  <em>–</em>
                )}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link
                  component={RouterLink}
                  to={`/documents/${document.id}`}
                  color={"inherit"}>
                  {document.name}
                </Link>
              </TableCell>
              <TableCell align="right">
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                  size="small">
                  <Tooltip
                    title={intl.formatMessage({
                      id: "documents.buttons.infoPage",
                      defaultMessage: "Print info page",
                    })}>
                    <Button
                      onClick={() =>
                        props.printReport(document.id, "info_page")
                      }>
                      <Print />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "documents.buttons.barcodeLabel",
                      defaultMessage: "Print barcode label",
                    })}>
                    <Button
                      onClick={() =>
                        props.printReport(document.id, "barcode_label")
                      }>
                      <CropFree />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "documents.buttons.edit",
                      defaultMessage: "Edit document",
                    })}>
                    <Button onClick={() => props.editDocument(document)}>
                      <Edit />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "documents.buttons.delete",
                      defaultMessage: "Delete document",
                    })}>
                    <Button onClick={() => props.deleteDocument(document)}>
                      <Delete />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DocumentsTable.propTypes = {
  editDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  printReport: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsTable);
