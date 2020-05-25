import { DataBaseConstructor } from "./../../services/db/types.d.ts";
import { notFoundErrorMessage } from "../constants.ts";
import { IHTTPConnectionIdParams } from "../types.d.ts";
import { IRecipe } from "../../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../../domain/services/repositories/recipes-repository.ts";

const deleteRecipe = (database: DataBaseConstructor) => ({
  params,
  response,
}: IHTTPConnectionIdParams) => {
  const recipeRepository = new RecipeRepository(database);
  const foundRecipe: IRecipe = recipeRepository.findById(params.id);
  if (!foundRecipe) {
    response.status = 404;
    response.body = {
      success: false,
      msg: notFoundErrorMessage,
    };

    return;
  }

  const recipe: IRecipe = recipeRepository.deleteById(params.id);
  response.status = 200;
  response.body = {
    success: true,
    data: recipe,
  };
};

export default deleteRecipe;
