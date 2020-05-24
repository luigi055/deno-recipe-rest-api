import { IWrite, IRead } from "./types.d.ts";
import { Collection } from "../../../../application/services/db/index.ts";
import { IDataBase } from "../../../../application/services/db/types.d.ts";

export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public _database: IDataBase;

  constructor(
    db: new (collectionName: string) => IDataBase,
    collection: Collection
  ) {
    this._database = new db(collection.toString());
  }

  get database(): IDataBase {
    return this._database;
  }

  create(item: T): T {
    const result = this.database.insert(item);

    return result;
  }

  updateById(id: string, item: T): T {
    const result = this.database.updateById(id, item);

    return result;
  }
  deleteById(id: string): T {
    const result = this.database.deleteById(id);

    return result;
  }

  getAll(): T[] {
    const result = this.database.getAll();

    return result;
  }

  findById(id: string): T {
    const result = this.database.findById(id);

    return result;
  }
}
