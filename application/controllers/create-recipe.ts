import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import { IHTTPConnection } from "./types.d.ts";
import { DataBaseConstructor } from "./constants.ts";

const createRecipe = (database: DataBaseConstructor) => async ({
  request,
  response,
}: IHTTPConnection) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data entered",
    };
    return;
  }

  const recipeRepository = new RecipeRepository(database);
  const recipe: IRecipe = recipeRepository.create(body.value);

  response.status = 201;
  response.body = {
    success: true,
    data: recipe,
  };
};

export default createRecipe;
