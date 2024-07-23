import CreationCard from "./CreationCard";
import { Fab, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAppDispatch from "../../hooks/useAppDispatch";
import { addStep, changeStep, deleteStep } from "../../store/createRecipeSlice";

import useAppSelector from "../../hooks/useAppSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export const CreateInstruction: React.FC = () => {
  const dispatch = useAppDispatch();
  const { instruction } = useAppSelector((state) => state.createRecipe);

  const renderQuestions = () => {
    return (
      <>
        {instruction.map((item, i) => {
          return (
            <div key={i} className="flex gap-x-3 w-full items-center">
              <TextField
                label={"Step " + String(item.step)}
                multiline
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) =>
                  dispatch(
                    changeStep({
                      arrayIndex: i,
                      description: event.target.value,
                    })
                  )
                }
                value={instruction[i].description}
                fullWidth
              />
              <IconButton onClick={() => dispatch(deleteStep(i))}>
                <DeleteIcon sx={{ color: "#70CBFF" }} />
              </IconButton>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <CreationCard>
      <div className="flex flex-col gap-y-5">
        {renderQuestions()}
        <Fab
          color="primary"
          size="medium"
          onClick={() => {
            dispatch(addStep());
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </CreationCard>
  );
};
