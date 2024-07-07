import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../data/axios";
import { RootState } from "./store";

const CREATE_RECIPE_URL = "/recipes";

type Entry = {
  measureId: number | "";
  ingredientId: number | "";
  amount: number | "";
};

// type Image = {
//   purpose: string;
//   id: number;
// };

type Step = {
  step: number;
  description: string;
};

type Tool = {
  toolId: number;
};

type CreateRecipeState = {
  name: string;
  entries: Entry[];
  instruction: Step[];
  tools: Tool[];
  time: number | "";
  servingsQty: number | "";
};

export const createRecipe = createAsyncThunk<
  string,
  number,
  { state: RootState }
>("createRecipe/createRecipe", async (imageId, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const payload = {
    name: state.createRecipe.name,
    ingredients: state.createRecipe.entries,
    steps: state.createRecipe.instruction,
    tools: [],
    avatarId: imageId,
    numberOfServings: state.createRecipe.servingsQty,
    cookingTimeInMinutes: state.createRecipe.time,
  };

  const response = await axios.post(CREATE_RECIPE_URL, payload);
  console.log(response);

  return "Recipe successfully created";
});

const initialState: CreateRecipeState = {
  name: "",
  entries: [{ amount: "", measureId: "", ingredientId: "" }],
  instruction: [{ step: 1, description: "" }],
  tools: [],
  servingsQty: "",
  time: "",
};

const createRecipeSlice = createSlice({
  name: "creteSlice",
  initialState,
  reducers: {
    resetRecipe(state) {
      state.name = "";

      state.entries = [{ amount: "", measureId: "", ingredientId: "" }];
      state.instruction = [{ step: 1, description: "" }];
      state.tools = [];
      state.servingsQty = "";
      state.time = "";
    },
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    changeEntries(state, action: PayloadAction<Entry[]>) {
      state.entries = action.payload;
    },
    changeInstruction(state, action: PayloadAction<Step[]>) {
      state.instruction = action.payload;
    },
    changeTools(state, action: PayloadAction<string[]>) {
      // state.tools = action.payload;
      state.tools = [{ toolId: 2 }, { toolId: 1 }];
    },
    changeServingsQty(state, action: PayloadAction<number | "">) {
      state.servingsQty = action.payload;
    },
    changeTime(state, action: PayloadAction<number | "">) {
      state.time = action.payload;
    },
    changeIngredientName(
      state,
      action: PayloadAction<{ id: number; ingredientId: number }>
    ) {
      state.entries[action.payload.id].ingredientId =
        action.payload.ingredientId;
    },
    changeIngredientMeasure(
      state,
      action: PayloadAction<{ id: number; measureId: number }>
    ) {
      state.entries[action.payload.id].measureId = action.payload.measureId;
    },
    changeIngredientAmount(
      state,
      action: PayloadAction<{ id: number; amount: number | "" }>
    ) {
      state.entries[action.payload.id].amount = action.payload.amount;
    },
    createIngredient(state) {
      state.entries.push({ amount: "", measureId: "", ingredientId: "" });
    },
    deleteIngredient(state, action: PayloadAction<number>) {
      state.entries.splice(action.payload, 1);
    },
    addStep(state) {
      state.instruction.push({
        step: state.instruction.length + 1,
        description: "",
      });
    },
    changeStep(
      state,
      action: PayloadAction<{ arrayIndex: number; description: string }>
    ) {
      state.instruction[action.payload.arrayIndex].step =
        action.payload.arrayIndex + 1;
      state.instruction[action.payload.arrayIndex].description =
        action.payload.description;
    },
    deleteStep(state, action: PayloadAction<number>) {
      state.instruction.splice(action.payload, 1);
      for (
        let index = action.payload;
        index < state.instruction.length;
        index++
      ) {
        state.instruction[index].step -= 1;
      }
    },
  },
});

export const {
  resetRecipe,
  changeName,
  changeEntries,
  changeInstruction,
  changeTools,
  changeServingsQty,
  changeTime,
  changeIngredientAmount,
  changeIngredientMeasure,
  changeIngredientName,
  createIngredient,
  deleteIngredient,
  changeStep,
  addStep,
  deleteStep,
} = createRecipeSlice.actions;

export default createRecipeSlice.reducer;
