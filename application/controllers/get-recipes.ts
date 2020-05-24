import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";

const getProducts = ({ response }: { response: any }) => {
  const recipeRepository = new RecipeRepository(DataBase);

  response.body = {
    success: true,
    data: recipeRepository.getAll(),
  };
};

export default getProducts;
