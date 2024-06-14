import Ingredient from "../ingredients/IngredientType";
import configuration from "./apiConfig";

const fetchIngredients = async () => {
  const ingredients = await fetch(
    `${configuration.API_URL + configuration.GET_INGREDIENTS} `
  );
  return ingredients;
};

const getIngredients = async (): Promise<Ingredient[]> => {
  const ingredients = await fetch(
    `${configuration.API_URL + configuration.GET_INGREDIENTS} `,
    { next: { revalidate: 0 } }
  )
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  return ingredients;
};

export default getIngredients;
