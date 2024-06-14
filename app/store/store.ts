import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import uploadImageReducer from "./uploadImageSlice";
import snackbarReducer from "./snackbarSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    uploadImage: uploadImageReducer,
    snackbars: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
