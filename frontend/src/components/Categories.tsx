import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {categories, auth} from "../actions";
import {FormattedMessage} from "react-intl";
import {useStyles} from "../styles";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CategoriesTable from "./CategoriesTable";
import CategoriesForm from "./CategoriesForm";
import {Dispatch} from "redux";
import {Category, User} from "../types";

interface CategoriesProps {
  fetchCategories: () => Dispatch;
  addCategory: (name: string, parent: number | null) => Dispatch;
  updateCategory: (id: number, name: string, parent: number | null) => Dispatch;
  deleteCategory: (id: number) => Dispatch;
  logout: () => Dispatch;
  user: User;
  categories: Category[];
}

function Categories(props: CategoriesProps) {
  const classes = useStyles();

  const formDialogDefault: {
    open: boolean;
    edit: boolean;
    category?: Category;
  } = {
    open: false,
    edit: false,
  };
  const [formDialog, setFormDialog] = useState(formDialogDefault);
  const [snackbar, setSnackbar] = useState("");

  const closeSnackbar = (e: React.SyntheticEvent) => {
    setSnackbar("");
  };
  useEffect(() => {
    props.fetchCategories();
  }, [props.user]);

  const openAddCategory = (e: React.MouseEvent) => {
    setFormDialog({open: true, edit: false});
  };

  const openEditCategory = (category: Category) => {
    setFormDialog({open: true, edit: true, category: category});
  };

  return (
    <div>
      <Snackbar
        open={snackbar === "success"}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success">
          <FormattedMessage
            id={"categories.texts.category-success"}
            defaultMessage={"The category was saved successfully."}
          />
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbar === "success_delete"}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success">
          <FormattedMessage
            id={"categories.texts.categoryDeleted"}
            defaultMessage={"The category was deleted successfully."}
          />
        </Alert>
      </Snackbar>

      <CategoriesForm
        closeDialog={() => setFormDialog({open: false, edit: false})}
        open={formDialog.open}
        edit={formDialog.edit}
        category={formDialog.category}
        updateCategory={(category, name, parent) => {
          props.updateCategory(category.id, name, parent);
          setSnackbar("success");
        }}
        addCategory={(name, parent) => {
          props.addCategory(name, parent);
          setSnackbar("success");
        }}
      />

      <Typography
        component={"h1"}
        variant={"h4"}
        className={classes.marginBottom}>
        <FormattedMessage
          id={"categories.headings.categories"}
          defaultMessage={"Categories"}
        />
      </Typography>

      <Button
        variant={"contained"}
        color={"primary"}
        startIcon={<Add />}
        onClick={openAddCategory}
        className={classes.marginBottomSmall}>
        <FormattedMessage
          id={"categories.buttons.addCategory"}
          defaultMessage={"Add category"}
        />
      </Button>

      <CategoriesTable
        editCategory={openEditCategory}
        deleteCategory={(category) => {
          props.deleteCategory(category.id);
          setSnackbar("success_delete");
        }}
        categories={props.categories}
      />
    </div>
  );
}

interface CategoriesState {
  categories: Category[];
  auth: {
    user: User;
  };
}

const mapStateToProps = (state: CategoriesState) => {
  return {
    categories: state.categories,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchCategories: () => {
      return dispatch(categories.fetchCategories());
    },
    addCategory: (name: string, parent: number | null) => {
      return dispatch(categories.addCategory(name, parent));
    },
    updateCategory: (id: number, name: string, parent: number | null) => {
      return dispatch(categories.updateCategory(id, name, parent));
    },
    deleteCategory: (id: number) => {
      return dispatch(categories.deleteCategory(id));
    },
    logout: () => dispatch(auth.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
