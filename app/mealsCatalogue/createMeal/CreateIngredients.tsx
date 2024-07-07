"use client";
import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
  Fab,
} from "@mui/material";
import CreationCard from "./CreationCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { fetchIngredients } from "../../store/ingredientsSlice";
import useAppSelector from "../../hooks/useAppSelector";

import {
  changeIngredientAmount,
  changeIngredientMeasure,
  changeIngredientName,
  createIngredient,
  deleteIngredient,
} from "../../store/createRecipeSlice";
import AddIcon from "@mui/icons-material/Add";

export const CreateIngredientsCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.ingredients);
  const { entries } = useAppSelector((state) => state.createRecipe);

  const measures = [
    { name: "Grams", id: 1 },
    { name: "tbs", id: 2 },
    { name: "kg", id: 3 },
  ];

  const renderIngredients = () => {
    return (
      <>
        {entries.map((item, i) => {
          return (
            <div key={i} className="flex gap-x-3 w-full items-center">
              <Select
                onChange={(event: SelectChangeEvent) => {
                  const newValue = Number(event.target.value);

                  if (typeof newValue == "number") {
                    dispatch(
                      changeIngredientName({
                        id: i,
                        ingredientId: Number(event.target.value),
                      })
                    );
                  }
                }}
                value={String(item.ingredientId)}
                fullWidth
                size="medium"
                variant="outlined"
              >
                {list.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                size="medium"
                variant="outlined"
                label="Amount"
                onChange={(event) => handleAmountChange(event, i)}
                value={item.amount}
              />
              <Select
                sx={{ minWidth: "100px" }}
                size="medium"
                variant="outlined"
                value={String(item.measureId)}
                onChange={(event: SelectChangeEvent) => {
                  const newValue = Number(event.target.value);

                  if (typeof newValue == "number") {
                    dispatch(
                      changeIngredientMeasure({
                        id: i,
                        measureId: Number(event.target.value),
                      })
                    );
                  }
                }}
              >
                {measures.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <IconButton
                onClick={() => {
                  dispatch(deleteIngredient(i));
                }}
              >
                <DeleteIcon sx={{ color: "#70CBFF" }} />
              </IconButton>
            </div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputId: number
  ) => {
    const value = event.target.value;
    if (value == "") {
      dispatch(changeIngredientAmount({ id: inputId, amount: value }));
    }
    if (!Number(value) || value.length > 5) {
      return;
    }

    dispatch(changeIngredientAmount({ id: inputId, amount: Number(value) }));
  };

  return (
    <>
      <CreationCard className="w-[766px]">
        <div className="flex flex-col gap-y-5">
          {renderIngredients()}
          <Fab
            color="primary"
            size="medium"
            onClick={() => {
              dispatch(createIngredient());
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </CreationCard>
    </>
  );
};
