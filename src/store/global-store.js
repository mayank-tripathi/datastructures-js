import { createContext, useReducer } from "react";
import { globalReducer } from "./global-reducer";

export const INITIAL_STATE = {
  error: null
};

export const useGlobalStore = () => {
  const [state, dispatch] = useReducer(globalReducer, INITIAL_STATE);

  return {
    ...state,
    showError: (message) => { dispatch({ type: 'SET_ERROR', payload: message }); },
    hideError: () => { dispatch({ type: 'SET_ERROR', payload: null }); }
  }
};

export const GlobalContext = createContext(INITIAL_STATE);