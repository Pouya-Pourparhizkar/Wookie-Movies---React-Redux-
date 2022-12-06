import wookieApi from "../apis/wookieApi";
import _ from "lodash";

export const fetchMovies = () => {
  return async (dispatch: any, getStates: any) => {
    let queryUrl = "/movies";
    if (getStates().searchTerm) {
      queryUrl = `/movies?q=${getStates().searchTerm}`;
    }

    dispatch({ type: "START_FETCHING" });

    const response = await wookieApi.get(queryUrl);

    dispatch(getGenres(response.data.movies));

    dispatch({
      type: "FETCH_MOVIES",
      payload: response.data.movies,
    });
  };
};

export const getGenres = (movies: Array<any>) => {
  let genres = _.union(..._.map(movies, "genres"));
  return {
    type: "GET_GENRES",
    payload: genres,
  };
};

export const applySearch = (searchTerm: string) => {
  return {
    type: "APPLY_SEARCH",
    payload: searchTerm,
  };
};

export const selectMovie = (id: string) => {
  return async (dispatch: any, getStates: any) => {
    dispatch({
      type: "SELECT_MOVIE",
      payload: getStates().movies.list[id],
    });
  };
};
