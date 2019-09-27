import React from "react";
import ActorImageCard from "../ActorImageCard/ActorImageCard";

import "./movieCredits.scss";

const MovieCredits = ({ credits }) => {
  return (
    <section className="movie-credits-container">
      <div className="group">
        <div className="group-item line"></div>
        <h1 className="title group-item text">Cast</h1>
        <div className="group-item line"></div>
      </div>
      <div className="movie-credits-container__cast">
        <div className="movie-credits-container__cast__inner">
          {credits &&
            credits.map(actor => {
              if (actor.profile_path !== null) {
                return <ActorImageCard key={actor.id} actor={actor} />;
              }
              return null;
            })}
        </div>
      </div>
    </section>
  );
};

export default MovieCredits;
