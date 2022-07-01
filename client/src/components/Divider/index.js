/**
 * A divider component that can be used to separate sections of content.
 * @param {string} children - The text to display in the divider.
 */
import React from "react";
import "./Divider.css";

const Divider = (props) => (
  <div className="divider d-flex align-items-center my-4">
    <p className="text-center fw-bold mx-3 mb-0 text-muted">{props.children}</p>
  </div>
);

export default Divider;
