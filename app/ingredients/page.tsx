import { Alert, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import useAppDispatch from "../../hooks/useAppDispatch";
import React, { useEffect, useState } from "react";

import getIngredients from "../data/getIngredients";
import IngredientCard from "../components/IngredientCard";
import IngredientsList from "./IngredientsList";
import CreateIngredient from "../components/CreateIngredient";
// import useAppSelector from "../../hooks/useAppSelector";
// import CreateIngredient from "../../components/CreateIngredient";

// // import { resetError, resetSuccessMessage } from "../../store/snackbarSlice";
// import IngredientsList from "./IngredientsList";

import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

const Ingredients = async () => {
  //   const dispatch = useAppDispatch();

  //   const error = useAppSelector((state) => state.snackbars.errorMessage);
  //   const successMsg = useAppSelector((state) => state.snackbars.successMessage);
  //   const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  //   const [successSnackbarOpen, setSuccessSnackbarOpen] =
  //     useState<boolean>(false);

  //   useEffect(() => {
  //     setErrorSnackbarOpen(Boolean(error));
  //   }, [error]);

  //   useEffect(() => {
  //     setSuccessSnackbarOpen(Boolean(successMsg));
  //   }, [successMsg]);

  //   const handleCloseErrorSnackbar = (
  //     _event: React.SyntheticEvent | Event,
  //     reason?: string
  //   ): void => {
  //     if (reason != "clickaway") {
  //       dispatch(resetError());
  //       setErrorSnackbarOpen(false);
  //     }
  //   };

  //   const handleCloseSuccessSnackbar = (
  //     _event: React.SyntheticEvent | Event,
  //     reason: string
  //   ): void => {
  //     if (reason != "clickaway") {
  //       dispatch(resetSuccessMessage());
  //       setSuccessSnackbarOpen(false);
  //     }
  //   };

  return (
    <div className="mx-auto mt-[50px]">
      {/* <Snackbar
        open={errorSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleCloseSuccessSnackbar}
        autoHideDuration={3000}
      >
        <Alert security="submit">{successMsg}</Alert>
      </Snackbar> */}
      <div className="fixed bottom-10 mt-24 right-[50px] z-10">
        <div className=""></div>
        <CreateIngredient>
          <Fab color="primary">
            <AddIcon></AddIcon>
          </Fab>
        </CreateIngredient>
      </div>
      <div className="flex flex-wrap justify-evenly gap-x-4 gap-y-10 mt-[50px] items-center max-w-[976px]">
        <IngredientsList />
      </div>
      {/* <Test /> */}
    </div>
  );
};

export default Ingredients;
