import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage, useIntl} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {useStyles} from "../styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CategorySelect from "./CategorySelect";
import {Category} from "../types";

interface CategoriesFormProps {
  closeDialog: () => any;
  updateCategory: (
    category: Category,
    name: string,
    parent: number | null
  ) => any;
  addCategory: (name: string, parent: number | null) => any;
  open: boolean;
  edit?: boolean;
  category?: Category;
}
function CategoriesForm(props: CategoriesFormProps) {
  const intl = useIntl();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [parent, setParent] = useState<number | null>(null);

  React.useEffect(() => {
    if (props.category) {
      setName(props.category.name);
    } else {
      setName("");
    }
    setParent(props.category ? props.category.parent : null);
  }, [props.category]);

  const handleCancel = (e: React.MouseEvent) => {
    props.closeDialog();
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.edit && props.category) {
      props.updateCategory(props.category, name, parent);
    } else if (!props.edit) {
      props.addCategory(name, parent);
    }
    setName("");
    setParent(null);
    props.closeDialog();
  };

  return (
    <Dialog open={props.open} onClose={handleCancel}>
      <form onSubmit={handleSave}>
        <DialogTitle>
          {props.edit ? (
            <FormattedMessage
              id={"categories.headings.editCategory"}
              defaultMessage={"Edit category"}
            />
          ) : (
            <FormattedMessage
              id={"categories.headings.addCategory"}
              defaultMessage={"Add a new category"}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <div className={classes.marginBottomSmall}>
            <TextField
              label={intl.formatMessage({
                id: "categories.labels.name",
                defaultMessage: "Name",
              })}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant={"outlined"}
              autoFocus
            />
          </div>
          <div className={classes.marginBottomSmall}>
            <FormControl variant="outlined" className={classes.fullWidth}>
              <InputLabel>
                <FormattedMessage
                  id={"categories.labels.parent"}
                  defaultMessage={"Parent category"}
                />
              </InputLabel>
              <CategorySelect
                label={
                  <FormattedMessage
                    id={"categories.labels.parent"}
                    defaultMessage={"Parent category"}
                  />
                }
                value={parent}
                onChange={setParent}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            <FormattedMessage
              id={"categories.buttons.cancel"}
              defaultMessage={"Cancel"}
            />
          </Button>
          <Button type="submit" color="primary">
            <FormattedMessage
              id={"categories.buttons.save"}
              defaultMessage={"Save category"}
            />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

CategoriesForm.defaults = {
  edit: false,
};
CategoriesForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  category: PropTypes.object,
};
export default CategoriesForm;
