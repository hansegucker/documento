import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {connect} from "react-redux";

function CategorySelect(props) {
  return (
    <Select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      label={props.label}>
      <MenuItem value="">
        <em>
          <FormattedMessage
            id={"categories.labels.none"}
            defaultMessage={"None"}
          />
        </em>
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
  );
}

CategorySelect.defaults = {
  label: (
    <FormattedMessage
      id={"categories.labels.category"}
      defaultMessage={"Category"}
    />
  ),
};

CategorySelect.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
