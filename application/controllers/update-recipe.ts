import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";

const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const recipeRepository = new RecipeRepository(DataBase);
  const recipe: IRecipe = recipeRepository.findById(params.id);

  if (!recipe) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No recipe found",
    };
    return;
  }

  const body = await request.body();
  const updatedRecipe: IRecipe = recipeRepository.updateById(
    params.id,
    body.value
  );

  response.status = 200;
  response.body = {
    success: true,
    data: updatedRecipe,
  };
};

export default updateProduct;
