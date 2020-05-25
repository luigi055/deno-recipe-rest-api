import { IDataBase } from "./../services/db/types.d.ts";

export const notFoundErrorMessage = "Not Recipe found";

export type DataBaseConstructor = new (collectionName: string) => IDataBase;
