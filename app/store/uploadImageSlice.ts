import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../data/axios";
import { RootState } from "./store";

const UPLOAD_IMAGE_URL = "/files";

type UploadingState = {
  isUploadDone: boolean;
  image: File | null;
  imagePreview: string;
  isImageChosen: boolean;
};

export const handleUploadImage = createAsyncThunk<
  number,
  undefined,
  { state: RootState }
>("uploadImage/handleUploadImage", async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  if (state.uploadImage.image) {
    const formData = new FormData();
    formData.append("file", state.uploadImage.image);
    const response = await axios.post(UPLOAD_IMAGE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response?.data?.id;
  }
});

const initialState: UploadingState = {
  isUploadDone: false,
  image: null,
  imagePreview: "",
  isImageChosen: false,
};

const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState,
  reducers: {
    getImage(state, action: PayloadAction<File | null>) {
      state.image = action.payload;
      action.payload
        ? (state.imagePreview = URL.createObjectURL(action.payload))
        : (state.imagePreview = "");
      state.isImageChosen = true;
    },
    removeImage(state) {
      state.image = null;

      state.isImageChosen = false;
    },
    removePreview(state) {
      state.imagePreview = "";
    },
  },
});

export const { getImage, removeImage, removePreview } =
  uploadImageSlice.actions;

export default uploadImageSlice.reducer;
