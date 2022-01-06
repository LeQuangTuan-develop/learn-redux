import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todosSlide";
// store
const store = configureStore({
  reducer: {
    todosReducer,
  },
});

export default store;
