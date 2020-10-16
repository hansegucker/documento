import {Breadcrumbs} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

function CategoryPath(props) {
  return (
    <Breadcrumbs>
      {props.category.parents.map((parent) => {
        return <span key={parent.id}>{parent.name}</span>;
      })}
      <span>{props.category.name}</span>
    </Breadcrumbs>
  );
}

CategoryPath.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryPath;
