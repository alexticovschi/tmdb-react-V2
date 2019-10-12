import React from "react";
import { Link } from "react-router-dom";

import "./button.scss";

const Button = ({ name, path }) => {
  return (
    <Link to={path} className="nav-btn">
      {name}
    </Link>
  );
};

export default Button;
