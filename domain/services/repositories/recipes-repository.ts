import { IDataBase } from "../../../application/services/db/database.d.ts";
import { IRecipe } from "../../model/entities/recipe/recipe.d.ts";
import BaseRepository from "./base/index.ts";

class RecipeRepository extends BaseRepository<IRecipe> {
  constructor(db: new (collectionName: string) => IDataBase) {
    super(db, "recipes");
  }
}

export default RecipeRepository;
