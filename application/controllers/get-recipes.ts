import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";
import { IHTTPConnection } from "./types.d.ts";

const getProducts = ({ response }: IHTTPConnection) => {
  const recipeRepository = new RecipeRepository(DataBase);

  response.status = 200;
  response.body = {
    success: true,
    data: recipeRepository.getAll(),
  };
};

export default getProducts;
