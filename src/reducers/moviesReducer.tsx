import _ from "lodash";

const initialState = {
  list: {},
  selectedMovie: null,
  isFetching: false,
};

const moviesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return {
        ...state,
        list: { ..._.mapKeys(action.payload, "id") },
        isFetching: false,
      };
    case "SELECT_MOVIE":
      return { ...state, selectedMovie: action.payload };
    case "START_FETCHING":
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default moviesReducer;
