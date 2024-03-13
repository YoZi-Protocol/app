import { createContext, useReducer } from 'react';

const initialState = {
  reqCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { reqCount: state.reqCount + 1 };
  }
};

// 创建 Context
export const StoreContext = createContext();

// Context Provider 组件
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
