import React, { useState } from "react";

import "./App.scss";
import { MoviesList } from "./components/MoviesList";
import moviesFromServer from "./api/movies.json";

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const App: React.FC = () => {
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>(moviesFromServer);

  const filteredMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value.trim()) {
      setVisibleMovies(moviesFromServer);
    }

    const filteredMovies = moviesFromServer.filter(
      (movie: Movie) =>
        movie.title
          .toLocaleLowerCase()
          .includes(
            value
            .toLocaleLowerCase()
            .trim()
            ) ||
        movie.description
          .toLocaleLowerCase()
          .includes(
            value
            .toLocaleLowerCase()
            .trim()
            )
    );

    setVisibleMovies(filteredMovies);
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={filteredMovies}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
