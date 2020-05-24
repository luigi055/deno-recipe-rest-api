export interface IRead<T> {
  getAll(): T[];
  findById(id: string): T;
}

export interface IWrite<T> {
  create(item: T): T;
  updateById(id: string, item: T): T;
  deleteById(id: string): T;
}
