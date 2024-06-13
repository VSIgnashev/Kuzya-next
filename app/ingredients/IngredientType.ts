type Nutrients = {
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
};

type Ingredient = {
  id: number;
  avatarId: number | null;
  name: string;
  nutrients: Nutrients;
};

export default Ingredient;
