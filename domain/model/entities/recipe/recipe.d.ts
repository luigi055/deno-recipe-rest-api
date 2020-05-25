import { IIngredients } from "./../../values-objects/ingredients/ingredients.d.ts";

export interface IRecipe {
  name: string;
  description: string;
  ingredients: IIngredients;
}

export interface MappingObject {
  ingredients: IIngredients;
  [index: string]: any;
}
