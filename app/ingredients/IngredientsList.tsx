// import { useEffect } from "react";
import IngredientCard from "../components/IngredientCard";
// import useAppDispatch from "../../hooks/useAppDispatch";
// import useAppSelector from "../../hooks/useAppSelector";
// import { fetchIngredients } from "../../store/ingredientsSlice";
import getIngredients from "../api/getIngredients";

const IngredientsList: React.FC = async () => {
  const ingredients = await getIngredients();

  return (
    <>
      {ingredients.map((item) => {
        return (
          <>
            <IngredientCard
              name={item.name}
              nutrients={item.nutrients}
              key={item.id}
              imageId={null}
            />
          </>
        );
      })}
    </>
  );
};

export default IngredientsList;
