import { DataBaseConstructor } from "./../../services/db/types.d.ts";
import RecipeRepository from "../../../domain/services/repositories/recipes-repository.ts";
import { IHTTPConnection } from "../types.d.ts";

const getRecipes = (database: DataBaseConstructor) => ({
  response,
}: IHTTPConnection) => {
  const recipeRepository = new RecipeRepository(database);

  response.status = 200;
  response.body = {
    success: true,
    data: recipeRepository.getAll(),
  };
};

export default getRecipes;
