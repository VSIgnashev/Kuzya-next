import MealCard from "../components/MealCard";
import getMeals from "../data/meals";

export const MealsList: React.FC = async () => {
  // const dispatch = useAppDispatch();
  // const list = useAppSelector((state) => state.recipes.list);

  // useEffect(() => {
  //   dispatch(fetchRecipes());
  // }, [dispatch]);

  const list = await getMeals();

  console.log(list);

  return (
    <>
      {list?.map((item, i) => {
        return (
          <MealCard
            recipeId={item.id}
            key={i}
            // imageId={item.files[0].id}
            title={item.name}
            cookingTime={item.cookingTimeInMinutes}
            servings={item.numberOfServings}
            calories={item.nutrients.calories}
            fats={item.nutrients.fats}
            proteins={item.nutrients.proteins}
            carbohydrates={item.nutrients.carbohydrates}
          />
        );
      })}
    </>
  );
};
