import Meal from "../mealsCatalogue/MealType";
import configuration from "./apiConfig";

const getMeals = async (): Promise<Meal[]> => {
  const meals = await fetch(
    `${configuration.API_URL + configuration.GET_MEALS} `,
    { next: { revalidate: 0 } }
  )
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  return meals;
};

export const getMealById = async (mealId: number): Promise<Meal> => {
  const GET_MEAL_URL =
    configuration.API_URL + configuration.GET_MEALS + "/" + mealId;
  const meal = await fetch(GET_MEAL_URL)
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return meal;
};

export default getMeals;
