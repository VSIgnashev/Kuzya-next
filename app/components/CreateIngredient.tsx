"use client";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../utility/modalWindow.scss";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  IngredientPayload,
  createIngredient,
  fetchIngredients,
} from "../store/ingredientsSlice";
import { createError, createSuccessMessage } from "../store/snackbarSlice";
import useAppSelector from "../hooks/useAppSelector";
import "../utility/uploadImageSt.scss";
import {
  getImage,
  handleUploadImage,
  removeImage,
  removePreview,
} from "../store/uploadImageSlice";
import { handleNumberInput, NumberInput } from "../utility/handleNumberInput";
interface TransitionEvent {
  elapsedTime: number;
  propertyName: string;
  pseudoElement: string;
}

interface CreateIngredientProps {
  children?: React.ReactElement;
}

const CreateIngredient: React.FC<CreateIngredientProps> = ({ children }) => {
  const ref = React.useRef(null);
  const dispatch = useAppDispatch();

  const { imagePreview, isImageChosen } = useAppSelector(
    (state) => state.uploadImage
  );

  const [open, setOpen] = React.useState<boolean>(false);

  const [imgResetAvailable, setImgResetAvailable] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<NumberInput>("");
  const [proteins, setProteins] = useState<NumberInput>("");
  const [fats, setFats] = useState<NumberInput>("");
  const [carbohydrates, setCarbohydrates] = useState<NumberInput>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const discardCreation = () => {
    // create reset button
    setName("");
    setCalories("");
    setProteins("");
    setFats("");
    setCarbohydrates("");
  };

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      dispatch(getImage(event.target.files[0]));
    }
  };

  async function handleCreateIngredient(event: React.SyntheticEvent) {
    event.preventDefault();
    if (name && calories && proteins && fats && carbohydrates) {
      await dispatch(handleUploadImage())
        .unwrap()
        .then(async (res) => {
          if (res) {
            const payload: IngredientPayload = {
              name,
              nutrients: {
                calories,
                proteins,
                fats,
                carbohydrates,
              },
              avatarId: res,
            };
            console.log("payload\n" + payload);
            await dispatch(createIngredient(payload))
              .unwrap()
              .then((res) => {
                dispatch(createSuccessMessage(res));
              })
              .catch((error) => {
                if (error?.name == "AxiosError") {
                  dispatch(createError(error?.message));
                }
              })
              .finally(() => {
                setOpen(false);
                dispatch(fetchIngredients());
                discardCreation();
                resetImage();
              });
          }
        })
        .catch((error) => dispatch(createError(error?.message)));
    }
  }

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName == "background-color" && isImageChosen) {
      setImgResetAvailable(true);
    }
  };

  const resetImage = () => {
    setImgResetAvailable(false);
    dispatch(removeImage());
    setTimeout(() => dispatch(removePreview()), 500);
  };

  return (
    <div className="mt-[50px]">
      <div onClick={() => handleOpen()}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalWindow w-[200px]">
          <form autoComplete="false" onSubmit={handleCreateIngredient}>
            <Card sx={{ width: 200, height: 400, position: "relative" }}>
              <div className=" relative">
                {imgResetAvailable && (
                  <div
                    className={imgResetAvailable ? "reset-button" : "hidden"}
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
                )}
                <label htmlFor="uploadFile" className="">
                  <input
                    ref={ref}
                    type="file"
                    className="hidden"
                    disabled={isImageChosen}
                    id="uploadFile"
                    accept="image/*"
                    onChange={handleChooseImage}
                  />
                  <img
                    src="./src/assets/upload_file_black_24dp.svg"
                    className={
                      isImageChosen
                        ? "upload-icon-invisible"
                        : "upload-icon-visible"
                    }
                  />
                  <div
                    className={isImageChosen ? "preview" : "no-preview"}
                  ></div>
                </label>

                <img
                  src="./src/assets/file_download_done_black_24dp.svg"
                  onTransitionEnd={handleTransitionEnd}
                  className={
                    isImageChosen && !imgResetAvailable
                      ? "upload-done-icon-visible ass"
                      : imgResetAvailable
                      ? "hidden"
                      : "upload-done-icon-invisible"
                  }
                />

                <CardMedia
                  component="img"
                  sx={{ aspectRatio: 4 / 3 }}
                  image={imagePreview}
                />
              </div>

              <CardContent>
                <TextField
                  required
                  variant="standard"
                  placeholder="Name of ingredient"
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                  }
                />

                <div className="mt-3 gap-y-1 flex flex-col items-start">
                  <div className="flex items-center">
                    <Typography>Calories:</Typography>
                    <TextField
                      required
                      variant="standard"
                      value={calories}
                      sx={{ ml: 1, width: 40 }}
                      placeholder="100"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleNumberInput(event, setCalories)
                      }
                    ></TextField>
                  </div>
                  <div className="flex items-center">
                    <Typography>Proteins:</Typography>
                    <TextField
                      required
                      placeholder="100"
                      variant="standard"
                      value={proteins}
                      sx={{ ml: 1, width: 40 }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleNumberInput(event, setProteins)
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <Typography>Fats:</Typography>
                    <TextField
                      required
                      placeholder="100"
                      variant="standard"
                      value={fats}
                      sx={{ ml: 1, width: 40 }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleNumberInput(event, setFats)
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <Typography>Carbohydrates:</Typography>
                    <TextField
                      required
                      placeholder="100"
                      variant="standard"
                      value={carbohydrates}
                      sx={{ ml: 1, width: 40 }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleNumberInput(event, setCarbohydrates)
                      }
                    />
                  </div>

                  <Button type="submit">Create ingredient</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateIngredient;
