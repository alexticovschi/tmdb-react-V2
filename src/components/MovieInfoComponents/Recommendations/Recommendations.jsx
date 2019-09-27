import React from "react";
import SwiperSlider from "../SwiperSlider/SwiperSlider";

import "./recommendations.scss";

const Recommendations = ({ movieRecommendations }) => {
  return (
    <section className="recommendations-container">
      {movieRecommendations.length > 0 ? (
        <div className="recommendations-container__inner">
          <div className="group">
            <div className="group-item line"></div>
            <h1 className="title group-item text">Recommendations</h1>
            <div className="group-item line"></div>
          </div>

          <SwiperSlider items={movieRecommendations} />
        </div>
      ) : null}
    </section>
  );
};

export default Recommendations;
