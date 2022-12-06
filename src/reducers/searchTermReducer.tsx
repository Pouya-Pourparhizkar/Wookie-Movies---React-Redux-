const searchTermReducer = (state = "", action: any) => {
  switch (action.type) {
    case "APPLY_SEARCH":
      return action.payload;
    default:
      return state;
  }
};

export default searchTermReducer;
