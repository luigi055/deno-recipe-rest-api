import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipe,
  getRecipes,
} from "../controllers/index.ts";

const router = new Router();
const recipesResourcePath = "/api/v1/recipes" as const;
const recipePathId = `${recipesResourcePath}/:id`;

router
  .get(recipesResourcePath, getRecipes)
  .get(recipePathId, getRecipe)
  .post(recipesResourcePath, createRecipe)
  .put(recipePathId, updateRecipe)
  .delete(recipePathId, deleteRecipe);

export default router;
