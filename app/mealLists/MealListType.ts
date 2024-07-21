type MealGroup = {
  id: number;
  name: string;
  recipes: {
    recipeId: number;
    recipeOrder: number;
  }[];
};

export type MealList = {
  id: number;
  name: string;
  mealGroups: MealGroup[];
};
