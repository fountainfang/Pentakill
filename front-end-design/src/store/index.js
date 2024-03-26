// import { createStore, applyMiddleware } from "redux"
// import rootReducer from "../reducers";
// import { composeWithDevTools } from "redux-devtools-extension"

// import { thunk } from 'redux-thunk';
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default store
// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import your root reducer
import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yourMiddleware),
  // If you have additional middleware, you can add it like shown above
});

export default store;
