import { Nutrients } from "../ingredients/IngredientType";

type Meal = {
  id: number;
  ownerId: number;
  avatarId: number;
  name: string;

  nutrients: Nutrients;
  cookingTimeInMinutes: number;
  numberOfServings: number;
  ingredients: {
    ingredientName: string;
    measureName: string;
    amount: number;
  }[];

  instruction: { step: number; description: string }[];
};

export default Meal;
