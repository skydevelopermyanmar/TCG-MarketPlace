export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return { ...state, byPrice: action.payload };
    default:
      return state;
  }
};
