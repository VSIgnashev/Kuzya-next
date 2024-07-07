import { Autocomplete, TextField } from "@mui/material";
import CreationCard from "./CreationCard";

import { StrokeButton } from "../../components/StrokeButton";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  getImage,
  removeImage,
  removePreview,
} from "../../store/uploadImageSlice";
import "../../utility/uploadImageSt.scss";

import {
  changeName,
  changeServingsQty,
  changeTime,
  changeTools,
} from "../../store/createRecipeSlice";

export const CreateMainParams: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isImageChosen, imagePreview } = useAppSelector(
    (state) => state.uploadImage
  );

  const { name, time, servingsQty, tools } = useAppSelector(
    (state) => state.createRecipe
  );

  const toolsList = ["oven", "microwave", "blender", "grill", "Air Frier"];

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      dispatch(getImage(event.target.files[0]));
    }
  };

  const resetImage = () => {
    dispatch(removeImage());
    setTimeout(() => dispatch(removePreview()), 500);
  };

  const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value == "") {
      dispatch(changeTime(value));
    }
    if (!Number(value) || value.length > 3) {
      return;
    }
    dispatch(changeTime(Number(value)));
  };

  const handleServingsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value == "") {
      dispatch(changeServingsQty(value));
    }
    if (!Number(value) || value.length > 3) {
      return;
    }
    dispatch(changeServingsQty(Number(value)));
  };

  return (
    <CreationCard className="w-[766px]">
      <div className="flex flex-col gap-y-[24px]">
        <TextField
          size="medium"
          fullWidth
          variant="outlined"
          label="Name"
          placeholder="Enter the name of the dish"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(changeName(event.target.value))
          }
        />
        <div className="flex gap-x-[25px]">
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Time"
            placeholder="Enter the cooking time"
            value={time}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleTimeInput(event)
            }
          ></TextField>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Servings"
            placeholder="Enter the number of servings"
            value={servingsQty}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleServingsInput(event)
            }
          ></TextField>
          <Autocomplete
            sx={{ minWidth: "291px" }}
            multiple
            id="tags-outlined"
            options={toolsList}
            getOptionLabel={(option: string) => option}
            onChange={(_event, newValue) => {
              dispatch(changeTools(newValue));
              console.log(tools);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Requirements" value={tools} />
            )}
          />
        </div>

        <div className=" relative">
          {isImageChosen ? (
            <div className="">
              {isImageChosen && (
                <>
                  <div
                    className={isImageChosen ? "reset-button" : "hidden"}
                    onClick={resetImage}
                  >
                    <img
                      className="done-icon"
                      src="./src/assets/file_download_done_black_24dp.svg"
                    />
                    <img
                      className="reset-icon"
                      src="./src/assets/clear_dark_red_24dp.svg"
                    />
                  </div>
                </>
              )}
              <img
                className="aspect-video object-cover h-auto w-full"
                src={imagePreview}
              />
            </div>
          ) : (
            <label htmlFor="uploadFile" className="">
              <input
                type="file"
                className="hidden"
                disabled={isImageChosen}
                id="uploadFile"
                accept="image/*"
                onChange={handleChooseImage}
              />
              <StrokeButton>Add image</StrokeButton>
            </label>
          )}
        </div>
      </div>
    </CreationCard>
  );
};
