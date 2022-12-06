import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import genresReducers from "./genresReducer";
import searchTermReducer from "./searchTermReducer";

export default combineReducers({
  movies: moviesReducer,
  genres: genresReducers,
  searchTerm: searchTermReducer,
});
