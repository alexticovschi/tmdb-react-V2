import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <div className="loader-container">
      <Loader type="Oval" color="#fff" width={60} height={60} />
    </div>
  );
};

export default Spinner;
