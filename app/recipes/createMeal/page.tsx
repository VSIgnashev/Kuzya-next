"use client";
import "../../utility/uploadImageSt.scss";
import { CreateMainParams } from "./CreateMainParams";
import { CreateIngredientsCard } from "./CreateIngredients";
import { CreateInstruction } from "./CreateInstruction";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { handleUploadImage, removeImage } from "../../store/uploadImageSlice";
import { createRecipe, resetRecipe } from "../../store/createRecipeSlice";
import { useEffect, useState } from "react";
import {
  createError,
  createSuccessMessage,
  resetError,
  resetSuccessMessage,
} from "../../store/snackbarSlice";

export type setter = () => void;

function CreateRecipe() {
  const { image } = useAppSelector((state) => state.uploadImage);
  const { errorMessage, successMessage } = useAppSelector(
    (state) => state.snackbars
  );
  const dispatch = useAppDispatch();

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] =
    useState<boolean>(false);

  const handleCreateRecipe = () => {
    dispatch(handleUploadImage())
      .unwrap()
      .then((res) =>
        dispatch(createRecipe(res))
          .unwrap()
          .catch((error) => {
            if (error?.name == "AxiosError") {
              dispatch(createError(error?.message));
              dispatch(resetRecipe());
              dispatch(removeImage());
            }
          })
          .then((res) => {
            if (res) {
              dispatch(createSuccessMessage(res));
            }
          })
      )
      .catch((error) => {
        if (error?.name == "AxiosError") {
          dispatch(createError(error?.message));
        }
      })
      .finally(() => console.log("asdsd"));
  };

  const handleCloseErrorSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason != "clickaway") {
      dispatch(resetError());
      setErrorSnackbarOpen(false);
    }
  };

  const handleCloseSuccessSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason != "clickaway") {
      dispatch(resetSuccessMessage());
      setSuccessSnackbarOpen(false);
    }
  };

  useEffect(() => {
    setErrorSnackbarOpen(Boolean(errorMessage));
  }, [errorMessage]);

  useEffect(() => {
    setSuccessSnackbarOpen(Boolean(successMessage));
  }, [successMessage]);

  return (
    <div className="mt-[90px] flex flex-col gap-y-10 mx-auto">
      <Snackbar
        open={errorSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleCloseSuccessSnackbar}
        autoHideDuration={3000}
      >
        <Alert security="submit">{successMessage}</Alert>
      </Snackbar>
      <Typography variant="h1" color="primary" fontSize={"32px"}>
        CreateRecipe
      </Typography>
      <CreateMainParams />
      <CreateIngredientsCard />
      <CreateInstruction />
      <Button
        onClick={handleCreateRecipe}
        variant="contained"
        size="large"
        sx={{ width: "140px" }}
      >
        Save
      </Button>
      <Button onClick={() => console.log(image)}>Debug</Button>
    </div>
  );
}

export default CreateRecipe;
