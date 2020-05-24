import { IDataBase, IDataBaseStorage, IDocument } from "./database.d.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const dataBase: IDataBaseStorage = { recipes: [] };

class DataBase implements IDataBase {
  private _collection: string = "";

  constructor(collection: string) {
    this._collection = collection;
  }

  get collection() {
    return dataBase[this._collection];
  }

  set collection(value) {
    dataBase[this._collection] = value;
  }

  private findDocumentIdIndex(id: string): number {
    const result = this.collection.findIndex(
      (document) => document.__id === id
    );

    return result;
  }

  public findById(id: string): IDocument {
    return this.collection[this.findDocumentIdIndex(id)];
  }

  public getAll(): any[] {
    return this.collection;
  }

  public insert(document: any): IDocument {
    document.__id = v4.generate();
    this.collection = [...this.collection, document];

    return document;
  }

  public updateById(id: string, documentToUpdate: any): IDocument {
    const documentIndex = this.findDocumentIdIndex(id);
    this.collection[documentIndex] = {
      ...documentToUpdate,
      __id: id,
    };

    return this.collection[documentIndex];
  }

  public deleteById(id: string): IDocument {
    const deletedDocument: IDocument = Object.assign({}, this.findById(id));

    this.collection = this.collection.filter(
      (document) => document.__id !== id
    );

    return deletedDocument;
  }
}

export default DataBase;