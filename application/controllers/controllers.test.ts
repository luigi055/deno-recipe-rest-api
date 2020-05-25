import { notFoundErrorMessage } from "./constants.ts";
import InMemoryDatabase, {
  clearInMemoryDatabase,
} from "./../services/db/inmemory-db.ts";
import { expect } from "https://deno.land/x/expect/expect.ts";
import { IHTTPConnection } from "./types.d.ts";
import createRecipe from "./create-recipe.ts";
import getRecipe from "./get-recipe.ts";
import getRecipes from "./get-recipes.ts";
import deleteRecipe from "./delete-recipe.ts";
import updateRecipe from "./update-recipe.ts";

const clearDatabaseRecipesCollection = () => clearInMemoryDatabase("recipes");

async function createRecipeDocument(): Promise<FakeHTTPConnection> {
  const result = new FakeHTTPConnection();
  result.enterBody(recipe);
  await createRecipe(InMemoryDatabase)(result);

  return result;
}
class FakeHTTPConnection implements IHTTPConnection {
  public response = { status: 0, body: { data: { __id: "" } } };
  public request = {
    body: () => Promise.resolve({ value: {} }),
    hasBody: false,
  };

  public params: any = {};

  public enterBody(body: any) {
    this.request.body = () => Promise.resolve({ value: body });
    this.request.hasBody = true;
  }

  public enterParam(param: string, value: string) {
    this.params[param] = value;
  }
}

const recipe = {
  name: "tortilla de patatas 120",
  description: "Deliciosa tortilla de patatas",
  ingredients: {
    eggs: "4",
    potatoes: "5",
    onion: "1/2 unit",
  },
};

const httpStatusCode = (code: number) => code;

Deno.test("it should return 400 when was call without body", async () => {
  const mockHTTPConnection = new FakeHTTPConnection();

  await createRecipe(InMemoryDatabase)(mockHTTPConnection);

  expect(mockHTTPConnection.response.status).toBe(httpStatusCode(400));
});

Deno.test(
  "it should create a new recipe when enter a correct data",
  async () => {
    const createdRecipe = await createRecipeDocument();

    const expectedBody = {
      body: {
        success: true,
        data: { ...recipe, __id: createdRecipe.response.body.data.__id },
      },
    };

    expect(createdRecipe.response).toEqual({
      status: httpStatusCode(201),
      ...expectedBody,
    });
    clearDatabaseRecipesCollection();
  }
);

Deno.test("it should find all the created recipes", async () => {
  const mockHTTPConnection = new FakeHTTPConnection();
  await createRecipeDocument();
  await createRecipeDocument();
  await createRecipeDocument();

  getRecipes(InMemoryDatabase)(mockHTTPConnection);

  expect(mockHTTPConnection.response.status).toBe(httpStatusCode(200));
  expect(mockHTTPConnection.response.body.data).toHaveLength(3);
  clearDatabaseRecipesCollection();
});

Deno.test("it should not find the recipe if id is missing", async () => {
  const mockHTTPConnection = new FakeHTTPConnection();
  mockHTTPConnection.enterParam("id", "something");
  const createdRecipe = await createRecipeDocument();

  getRecipe(InMemoryDatabase)(mockHTTPConnection);

  expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(404));
  expect(mockHTTPConnection.response.body).toEqual({
    success: false,
    msg: notFoundErrorMessage,
  });
  clearDatabaseRecipesCollection();
});

Deno.test(
  "it should find the recipe when the id param match with one recipe document",
  async () => {
    const mockHTTPConnection = new FakeHTTPConnection();
    const createdRecipe = await createRecipeDocument();

    const createdRecipeId = createdRecipe.response.body.data.__id;
    mockHTTPConnection.enterParam("id", createdRecipeId);

    const expectedBody = {
      success: true,
      data: { ...recipe, __id: createdRecipe.response.body.data.__id },
    };

    getRecipe(InMemoryDatabase)(mockHTTPConnection);

    expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(200));
    expect(mockHTTPConnection.response.body).toEqual(expectedBody);
    expect(mockHTTPConnection.response.body.data.__id).toEqual(createdRecipeId);
    clearDatabaseRecipesCollection();
  }
);

Deno.test("it should not delete the recipe if id is missing", async () => {
  const mockHTTPConnection = new FakeHTTPConnection();
  mockHTTPConnection.enterParam("id", "something");
  const createdRecipe = await createRecipeDocument();

  deleteRecipe(InMemoryDatabase)(mockHTTPConnection);

  expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(404));
  expect(mockHTTPConnection.response.body).toEqual({
    success: false,
    msg: notFoundErrorMessage,
  });
  clearDatabaseRecipesCollection();
});

Deno.test(
  "it should delete the recipe when the id param match with one recipe document",
  async () => {
    const mockHTTPConnection = new FakeHTTPConnection();
    const createdRecipe = await createRecipeDocument();

    const createdRecipeId = createdRecipe.response.body.data.__id;
    mockHTTPConnection.enterParam("id", createdRecipeId);

    const expectedBody = {
      success: true,
      data: { ...recipe, __id: createdRecipe.response.body.data.__id },
    };

    deleteRecipe(InMemoryDatabase)(mockHTTPConnection);
    expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(200));
    expect(mockHTTPConnection.response.body).toEqual(expectedBody);
    expect(mockHTTPConnection.response.body.data.__id).toEqual(createdRecipeId);

    getRecipe(InMemoryDatabase)(mockHTTPConnection);
    expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(404));
    expect(mockHTTPConnection.response.body).toEqual({
      success: false,
      msg: notFoundErrorMessage,
    });

    clearDatabaseRecipesCollection();
  }
);

Deno.test("it should not update the recipe if id is missing", async () => {
  const mockHTTPConnection = new FakeHTTPConnection();
  mockHTTPConnection.enterParam("id", "something");
  await createRecipeDocument();

  await updateRecipe(InMemoryDatabase)(mockHTTPConnection);

  expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(404));
  expect(mockHTTPConnection.response.body).toEqual({
    success: false,
    msg: notFoundErrorMessage,
  });
  clearDatabaseRecipesCollection();
});

Deno.test(
  "it should update the recipe when the id param match with one recipe document",
  async () => {
    const mockHTTPConnection = new FakeHTTPConnection();
    const createdRecipe = await createRecipeDocument();
    const updatedRecipe = { ...recipe, name: "tortilla de patatas modified" };

    const createdRecipeId = createdRecipe.response.body.data.__id;
    mockHTTPConnection.enterParam("id", createdRecipeId);
    mockHTTPConnection.enterBody(updatedRecipe);

    await updateRecipe(InMemoryDatabase)(mockHTTPConnection);

    const expectedBody = {
      success: true,
      data: { ...updatedRecipe, __id: createdRecipe.response.body.data.__id },
    };

    expect(mockHTTPConnection.response.status).toEqual(httpStatusCode(200));
    expect(mockHTTPConnection.response.body).toEqual(expectedBody);
    expect(mockHTTPConnection.response.body.data.__id).toEqual(createdRecipeId);

    clearDatabaseRecipesCollection();
  }
);
