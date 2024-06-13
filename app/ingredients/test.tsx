import { Button } from "@mui/material";
import getIngredients from "../api/getIngredients";

const Test: React.FC<any> = (asd: any) => {
  return (
    <div className="mt-10">
      <Button onClick={() => getIngredients()}>asd</Button>
    </div>
  );
};

export default Test;
