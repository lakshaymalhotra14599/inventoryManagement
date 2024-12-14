import React, { createContext, useReducer } from 'react';
import { reducer, initialState, Action, State } from '../inventoryReducer';

const RoleContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);
// why null ?

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RoleContext.Provider value={{ state, dispatch }}>
      {children}
    </RoleContext.Provider>
  );
};
export default RoleContext ;

