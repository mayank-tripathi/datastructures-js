export const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { error: action.payload };
    default:
      throw new Error();
  }
};
