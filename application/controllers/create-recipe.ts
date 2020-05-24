import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";

const createRecipe = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
    return;
  }

  const recipeRepository = new RecipeRepository(DataBase);
  const recipe: IRecipe = recipeRepository.create(body.value);
  response.status = 201;
  response.body = {
    success: true,
    data: recipe,
  };
};

export default createRecipe;
