import React from "react";
import ShowMore from "react-show-more";

import "./biography.scss";

const Biography = ({ biography }) => {
  return (
    <section className="biography">
      <h2 className="biography__title">Biography</h2>

      <ShowMore
        lines={3}
        more="Show more"
        less="Show less"
        anchorClass="biography__anchor"
      >
        <p>{biography}</p>
      </ShowMore>
    </section>
  );
};

export default Biography;
