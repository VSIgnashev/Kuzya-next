"use client";

import { Button } from "@mui/material";
import { getMealListById } from "./data/mealLists";

export default function Home() {
  var res: any;

  return (
    <main className="mt-40">
      <Button
        onClick={() => {
          res = getMealListById(1);
        }}
      >
        asdasd
      </Button>
      <Button onClick={() => console.log(res)}>show</Button>
    </main>
  );
}
