export const initialState = {
  bag: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    // Logic to add to bag

    case 'ADD_TO_BAG':
      if (state.bag.includes(action.item)) {
        // Return the state as previous
        return { ...state, bag: [...state.bag] };
      }
      return { ...state, bag: [...state.bag, action.item] };
    case 'REMOVE_FROM_BAG':
      const filterBag = state.bag.filter((prod) => prod !== action.item);
      return { ...state, bag: filterBag };
    case 'REMOVE_ALL':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
