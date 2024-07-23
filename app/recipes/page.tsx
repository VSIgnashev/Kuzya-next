import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Link from "next/link";
import { MealsList } from "./MealsList";

function Meals() {
  return (
    <div className="mx-auto mt-[50px]">
      <div className="fixed bottom-10 right-[50px] z-10">
        <Link href="meals/createMeal">
          <Fab color="primary">
            <AddIcon></AddIcon>
          </Fab>
        </Link>
      </div>
      <div className="flex flex-wrap justify-evenly gap-x-4 gap-y-10 mt-[50px] items-center max-w-[1076px]">
        <MealsList />
      </div>
    </div>
  );
}

export default Meals;
