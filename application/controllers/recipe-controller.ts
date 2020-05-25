import RecipeRepository from "../../domain/services/repositories/recipes-repository.ts";
import DataBase from "../services/db/inmemory-db.ts";
import { IHTTPConnection } from "./types.d.ts";
import { IDataBase } from "./../services/db/types.d.ts";
import { IRecipe } from "../../domain/model/entities/recipe/index.ts";
import { notFoundErrorMessage } from "./constants.ts";
import { IHTTPConnectionIdParams } from "./types.d.ts";

export default class RecipeController {
  constructor(private _database: new (collectionName: string) => IDataBase) {}

  private get database() {
    return this._database;
  }

  async createRecipe({ request, response }: IHTTPConnection) {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data entered",
      };
      return;
    }

    const recipeRepository = new RecipeRepository(this.database);
    const recipe: IRecipe = recipeRepository.create(body.value);

    response.status = 201;
    response.body = {
      success: true,
      data: recipe,
    };
  }

  getRecipes({ response }: IHTTPConnection) {
    const recipeRepository = new RecipeRepository(this.database);

    response.status = 200;
    response.body = {
      success: true,
      data: recipeRepository.getAll(),
    };
  }

  getRecipe({ params, response }: IHTTPConnectionIdParams) {
    const recipeRepository = new RecipeRepository(this.database);
    const recipe: IRecipe = recipeRepository.findById(params.id);
    if (!recipe) {
      response.status = 404;
      response.body = {
        success: false,
        msg: notFoundErrorMessage,
      };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: recipe,
    };
  }

  deleteRecipe({ params, response }: IHTTPConnectionIdParams) {
    const recipeRepository = new RecipeRepository(this.database);
    const foundRecipe: IRecipe = recipeRepository.findById(params.id);
    if (!foundRecipe) {
      response.status = 404;
      response.body = {
        success: false,
        msg: notFoundErrorMessage,
      };

      return;
    }

    const recipe: IRecipe = recipeRepository.deleteById(params.id);
    response.status = 200;
    response.body = {
      success: true,
      data: recipe,
    };
  }

  async updateRecipe({ params, request, response }: IHTTPConnectionIdParams) {
    const recipeRepository = new RecipeRepository(this.database);
    const recipe: IRecipe = recipeRepository.findById(params.id);

    if (!recipe) {
      response.status = 404;
      response.body = {
        success: false,
        msg: notFoundErrorMessage,
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
  }
}
