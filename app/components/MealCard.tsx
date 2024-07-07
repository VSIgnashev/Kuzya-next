import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Typography,
  Divider,
  Stack,
  CardContent,
} from "@mui/material";
import BlenderIcon from "@mui/icons-material/Blender";
import Link from "next/link";
// import { BASE_URL } from "../api/axios";
// import { Link } from "react-router-dom";

const DOWNLOAD_IMAGE_URL = "/files";

interface MealCardProps {
  imageId?: number;
  title: string;
  cookingTime: number;
  servings: number;
  calories: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
  recipeId: number;
}

const MealCard: React.FC<MealCardProps> = ({
  imageId = 1,
  title,
  cookingTime,
  servings,
  recipeId,
  calories = 100,
  fats = 100,
  proteins = 100,
  carbohydrates = 100,
}) => {
  //href={{ pathname: "/recipes/[slug]", query: { slug: recipeId } }}
  return (
    <Link href={`/recipes/${recipeId}`}>
      <CardActionArea sx={{ maxWidth: 320, height: 502 }}>
        <Card sx={{ maxWidth: 320, height: 502 }}>
          <CardMedia
            component="img"
            sx={{ aspectRatio: "16/9" }}
            // image={BASE_URL + DOWNLOAD_IMAGE_URL + `/${imageId}`}
          />
          <CardHeader
            title={title}
            // action={<Favorite />}
            sx={{ textAlign: "left", fontSize: 24 }}
          ></CardHeader>

          <CardContent>
            <Typography variant="body1" color="text.secondary" align="left">
              {"Servings: " + servings}
            </Typography>

            <Typography variant="body1" color="text.secondary" align="left">
              {"Cooking time: " + cookingTime + " minutes"}
            </Typography>
            <Typography
              mt={"4px"}
              variant="body1"
              color="text.secondary"
              align="left"
            >
              {"Calories: " + calories}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="left">
              {"Fats: " + fats}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="left">
              {"Proteins: " + proteins}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="left">
              {"Carbohydrates: " + carbohydrates}
            </Typography>

            <Divider sx={{ mt: 1 }} />
            <Stack sx={{ mt: 1 }} direction="row">
              <BlenderIcon />
              <BlenderIcon />
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
};

export default MealCard;
