import { IRecipe } from "../../model/entities/recipe/recipe.d.ts";
import BaseRepository from "./base/index.ts";
import { Collection } from "../../../application/services/db/index.ts";
import { IDataBase } from "../../../application/services/db/types.d.ts";

class RecipeRepository extends BaseRepository<IRecipe> {
  constructor(db: new (collectionName: string) => IDataBase) {
    super(db, new Collection("recipes"));
  }
}

export default RecipeRepository;
