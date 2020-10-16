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
import {FormattedMessage, useIntl} from "react-intl";
import Tooltip from "@material-ui/core/Tooltip";
import {Breadcrumbs} from "@material-ui/core";

export default function CategoriesTable(props) {
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
                id={"categories.headings.name"}
                defaultMessage={"Name"}
              />
            </TableCell>
            <TableCell align={"right"}>
              <FormattedMessage
                id={"categories.headings.actions"}
                defaultMessage={"Actions"}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(props.categories).map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <code>{category.id}</code>
              </TableCell>
              <TableCell component="th" scope="row">
                <Breadcrumbs>
                  {category.parents.map((parent) => {
                    return <span key={parent.id}>{parent.name}</span>;
                  })}
                  <span>{category.name}</span>
                </Breadcrumbs>
              </TableCell>
              <TableCell align="right">
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                  size="small">
                  <Tooltip
                    title={intl.formatMessage({
                      id: "categories.buttons.edit",
                      defaultMessage: "Edit category",
                    })}>
                    <Button onClick={() => props.editCategory(category)}>
                      <Edit />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "categories.buttons.delete",
                      defaultMessage: "Delete category",
                    })}>
                    <Button onClick={() => props.deleteCategory(category)}>
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

CategoriesTable.propTypes = {
  editCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
