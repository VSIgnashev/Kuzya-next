import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../data/axios";

const GET_INGREDIENTS_URL = "/ingredients";
const CREATE_INGREDIENT_URL = "/ingredients";

export type Ingredient = {
  name: string;
  nutrients: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
  id: string;
  avatarId: number;
};

type Image = {
  purpose: string;
  id: number;
};

export type IngredientPayload = {
  name: string;
  nutrients: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
  avatarId: number;
};

type IngredientsState = {
  list: Ingredient[];
  loading: boolean;
};

export const fetchIngredients = createAsyncThunk<
  Ingredient[],
  undefined,
  { rejectValue: string }
>("ingredients/fetchIngredients", async function (_, { rejectWithValue }) {
  const response = await axios.get(GET_INGREDIENTS_URL);

  if (response.status != 200) {
    return rejectWithValue(response.statusText);
  }

  return response.data;
});

export const createIngredient = createAsyncThunk<
  string,
  IngredientPayload,
  { rejectValue: string }
>("ingredients/createIngredient", async function (payload) {
  await axios.post(CREATE_INGREDIENT_URL, payload);

  return "Ingredient successfully created";
});

const initialState: IngredientsState = {
  list: [],
  loading: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export default ingredientsSlice.reducer;

// function isError(action: AnyAction) {
//   return action.type.endsWith("rejected");
// }
