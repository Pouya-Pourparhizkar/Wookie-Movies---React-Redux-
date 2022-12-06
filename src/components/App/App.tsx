import React from "react";
import { connect } from "react-redux";
import MovieList from "../MovieList/MovieList";
import SearchBox from "../SearchBox/SearchBox";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./App.css";

const App = (props: any) => {
  return (
    <div className="appContainer">
      <SearchBox />
      <MovieList />
      {props.selectedMovie && <MovieDetail />}
    </div>
  );
};

const mapStatesToProps = (state: any) => {
  return { selectedMovie: state.movies.selectedMovie };
};

export default connect(mapStatesToProps)(App);
