import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {connect} from "react-redux";
import {Category} from "../types";

interface CategorySelectProps {
  value: number | string | null;
  onChange: (value: number | null) => any;
  label?: string | React.ReactElement;
  categories: Category[];
}
function CategorySelect(props: CategorySelectProps) {
  return (
    <Select
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value || null))}
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

const mapStateToProps = (state: {categories: Category[]}) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
