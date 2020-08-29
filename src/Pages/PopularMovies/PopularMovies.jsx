import React from "react";
import FetchMovies from "../../components/FetchMovies/FetchMovies";

const PopularMovies = () => (
  <FetchMovies slug="popular" pageTitle="Popular Movies" />
);

export default PopularMovies;
