import { IIngredients } from "./../../values-objects/ingredients/ingredients.d.ts";

export interface IRecipe {
  __id: string;
  name: string;
  description: string;
  ingredients: IIngredients;
}
