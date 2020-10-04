import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>Sorry: Page not found</h2>
        <p>
          <Link to="/contact">Click Here</Link> to contact us!
        </p>
      </div>
    );
  }
}
