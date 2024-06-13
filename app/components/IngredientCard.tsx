import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";

//   import { BASE_URL } from "../api/axios";

const DOWNLOAD_IMAGE_URL = "/files";

interface IngredientCardProps {
  name: string;

  imageId?: number | null;
  nutrients: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  name,
  nutrients,
  imageId,
}: IngredientCardProps) => {
  return (
    <div>
      <CardActionArea sx={{}}>
        <Card sx={{ width: 200, height: 350 }}>
          <CardMedia
            component="img"
            sx={{ aspectRatio: 4 / 3 }}
            //   image={
            //     imageId
            //       ? BASE_URL + DOWNLOAD_IMAGE_URL + `/${imageId}`
            //       : "./src/assets/placeholder-image.jpg"
            //   }
            image={"./src/assets/placeholder-image.jpg"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="left">
              {name}
            </Typography>

            <Divider sx={{ mt: 1 }} />
            <div className="mt-3 gap-y-1 flex flex-col items-start">
              <Typography>Calories: {nutrients.calories}</Typography>
              <Typography>Proteins: {nutrients.proteins}</Typography>
              <Typography>Fats: {nutrients.fats}</Typography>
              <Typography>Carbohydrates: {nutrients.carbohydrates}</Typography>
            </div>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
};

export default IngredientCard;
