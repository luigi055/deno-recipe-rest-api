import { Router } from "https://deno.land/x/oak/mod.ts";
import { DataBaseConstructor } from "./../services/db/types.d.ts";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipe,
  getRecipes,
} from "../controllers/index.ts";
import InMemoryDatabase from "../services/db/inmemory-db.ts";

const router = new Router();
const recipesResourcePath = "/api/v1/recipes" as const;
const recipePathId = `${recipesResourcePath}/:id`;

const setRouter = (database: DataBaseConstructor) => {
  router
    .get(recipesResourcePath, getRecipes(database))
    .get(recipePathId, getRecipe(database))
    .post(recipesResourcePath, createRecipe(database))
    .put(recipePathId, updateRecipe(database))
    .delete(recipePathId, deleteRecipe(database));

  return router;
};

export default setRouter(InMemoryDatabase);
