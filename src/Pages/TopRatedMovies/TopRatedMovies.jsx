import React from "react";
import FetchMovies from "../../components/FetchMovies/FetchMovies";

const TopRatedMovies = () => (
  <FetchMovies slug="top_rated" pageTitle="Top Rated Movies" />
);

export default TopRatedMovies;
