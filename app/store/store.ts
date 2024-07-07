import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import uploadImageReducer from "./uploadImageSlice";
import snackbarReducer from "./snackbarSlice";
import createRecipeSlice from "./createRecipeSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    uploadImage: uploadImageReducer,
    snackbars: snackbarReducer,
    createRecipe: createRecipeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
