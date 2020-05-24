import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";

const deleteRecipe = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const recipeRepository = new RecipeRepository(DataBase);
  const foundRecipe: IRecipe = recipeRepository.findById(params.id);
  if (!foundRecipe) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Not Recipe found",
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
