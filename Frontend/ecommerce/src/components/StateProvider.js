// setup data layer

import { createContext, useReducer, useContext } from 'react';

// We need this to track the bag

export const StateContext = createContext();

// BUILD A PROVIDER TO WRAP OUR ENTIRE APP

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
