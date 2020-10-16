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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {connect} from "react-redux";

function CategoriesForm(props) {
  const intl = useIntl();
  const classes = useStyles();

  React.useEffect(() => {
    if (props.category) {
      setName(props.category.name);
    } else {
      setName("");
    }
    setParent(props.category ? props.category.parent : null);
  }, [props.category]);

  const [name, setName] = useState("");
  const [parent, setParent] = useState(null);

  const handleCancel = (e) => {
    props.closeDialog();
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (props.edit) {
      props.updateCategory(props.category, name, parent);
    } else {
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
              <Select
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                label={
                  <FormattedMessage
                    id={"categories.labels.parent"}
                    defaultMessage={"Parent category"}
                  />
                }>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {props.categories
                  ? Object.values(props.categories).map(function (selCategory) {
                      return (
                        <MenuItem value={selCategory.id} key={selCategory.id}>
                          {selCategory.name}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="danger">
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
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForm);
