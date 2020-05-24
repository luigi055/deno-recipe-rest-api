import { IWrite, IRead } from "./types.d.ts";
import { IDataBase } from "../../../../application/services/db/database.d.ts";

export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public _collection: IDataBase;

  constructor(
    db: new (collectionName: string) => IDataBase,
    collectionName: string
  ) {
    this._collection = new db(collectionName);
  }

  get collection(): IDataBase {
    return this._collection;
  }

  create(item: T): T {
    const result = this.collection.insert(item);

    return result;
  }

  updateById(id: string, item: T): T {
    const result = this.collection.updateById(id, item);

    return result;
  }
  deleteById(id: string): T {
    const result = this.collection.deleteById(id);

    return result;
  }

  getAll(): T[] {
    const result = this.collection.getAll();

    return result;
  }

  findById(id: string): T {
    const result = this.collection.findById(id);

    return result;
  }
}
