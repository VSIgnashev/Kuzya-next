import { MealList } from "../mealLists/MealListType";
import configuration from "./apiConfig";

export const getMealListById = async (id: number): Promise<MealList> => {
  const GET_MEALLIST_URL =
    configuration.API_URL + configuration.GET_MEALLISTS + "/" + id;
  const mealList = await fetch("http://localhost:3000/api/v1/meal-lists/1")
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return mealList;
};
