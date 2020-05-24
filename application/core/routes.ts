import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipe,
  getRecipes,
} from "../controllers/index.ts";

const router = new Router();

router
  .get("/api/v1/recipes", getRecipes)
  .get("/api/v1/recipes/:id", getRecipe)
  .post("/api/v1/recipes", createRecipe)
  .put("/api/v1/recipes/:id", updateRecipe)
  .delete("/api/v1/recipes/:id", deleteRecipe);

export default router;
