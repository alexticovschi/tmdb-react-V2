import React from "react";
import Rater from "react-rater";
import { Link } from "react-router-dom";

import "react-rater/lib/react-rater.css";
import Fade from "react-reveal/Fade";

import "./tvShowData.scss";

const not_available_poster =
  "https://dummyimage.com/342x500/7b8a91/ffffff&text=Poster+Not+Available";

const TVShowData = ({
  imgPath1,
  imgPath2,
  base_url1,
  base_url2,
  tvShow,
  list
}) => (
  <section className="tvshow-data">
    <div className="tvshow-data__inner">
      <img
        className="tvshow-data__backdrop"
        src={imgPath2 === null ? not_available_poster : base_url2 + imgPath2}
        alt={"tvshow-data backdrop"}
      />
      <Fade>
        <img
          className="tvshow-data__poster"
          src={imgPath1 === null ? not_available_poster : base_url1 + imgPath1}
          alt={"tvshow-data poster"}
        />
        <div className="tvshow-data__details">
          <h1 className="tvshow-data__title">
            {tvShow.original_title}
            {/* <small>{movie.release_date}</small> */}
          </h1>

          {list !== null ? (
            <div className="tvshow-data__details__genre">
              <strong>Genre: </strong>
              {list.map(genre => (
                <Link
                  key={genre.id}
                  to={`/genres/${genre.id}`}
                  className="tvshow-data__details__genre-item"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="tvshow-data__star-rating">
            <strong>Rating: </strong>
            <Rater
              interactive={false}
              total={5}
              rating={tvShow.vote_average / 2}
            />
          </div>
          <p>
            <strong>Seasons: </strong> {tvShow.seasons.length}
          </p>
        </div>
      </Fade>
    </div>
  </section>
);

export default TVShowData;
