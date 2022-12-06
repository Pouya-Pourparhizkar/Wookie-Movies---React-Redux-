import React from "react";
import { connect } from "react-redux";
import { fetchMovies, selectMovie } from "../../actions";
import "./MovieList.css";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IMovieListProps {
  movies?: Array<any>;
  genres?: Array<string>;
  isFetching: boolean;
  fetchMovies: any;
  selectMovie: any;
}

class MovieList extends React.Component<IMovieListProps> {
  componentDidMount = () => {
    this.props.fetchMovies();
  };

  openMovieDetail = (id: string) => (e: any) => {
    e.stopPropagation();
    this.props.selectMovie(id);
  };

  renderMovies = (movies: Array<any> = [], genre: string) => {
    return movies
      .filter((movie) => {
        return movie.genres.indexOf(genre) !== -1;
      })
      .map((movie) => {
        return (
          <div
            key={genre + movie.id}
            className="imageContainer"
            onClick={this.openMovieDetail(movie.id)}
          >
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="movieImage"
            />
          </div>
        );
      });
  };

  renderGenres = () => {
    const movies = this.props.movies;
    const genres = this.props.genres;

    if (movies && genres && movies.length) {
      return genres.map((genre, genreIndex) => {
        return (
          <div key={genreIndex} className="genreContainer">
            <div className="genreTitle">{genre}</div>
            <hr />
            <div className="moviesContainer">
              {this.renderMovies(movies, genre)}
            </div>
          </div>
        );
      });
    }

    return <div className="NoResultContainer">No Result Found!</div>;
  };

  render() {
    return (
      <div className="movieListContainer">
        {this.props.isFetching ? (
          <div className="isfetchingContainer">
            <CircularProgress />
          </div>
        ) : (
          this.renderGenres()
        )}
      </div>
    );
  }
}

const mapStatesToProps = (state: any) => {
  return {
    movies: Object.values(state.movies.list),
    genres: state.genres,
    isFetching: state.movies.isFetching,
  };
};

export default connect(mapStatesToProps, { fetchMovies, selectMovie })(
  MovieList
);
