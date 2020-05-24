import { notFoundErrorMessage } from "./constants.ts";
import { IHTTPConnectionIdParams } from "./types.d.ts";
import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";

const getRecipe = ({ params, response }: IHTTPConnectionIdParams) => {
  const recipeRepository = new RecipeRepository(DataBase);
  const recipe: IRecipe = recipeRepository.findById(params.id);
  if (!recipe) {
    response.status = 404;
    response.body = {
      success: false,
      msg: notFoundErrorMessage,
    };
    return;
  }

  response.status = 200;
  response.body = {
    success: true,
    data: recipe,
  };
};

export default getRecipe;
