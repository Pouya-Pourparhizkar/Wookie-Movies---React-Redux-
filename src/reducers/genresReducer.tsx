const genresReducer = (state = [], action: any) => {
  switch (action.type) {
    case "GET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

export default genresReducer;
