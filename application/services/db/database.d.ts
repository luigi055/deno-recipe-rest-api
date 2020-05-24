export interface IDataBase {
  findById(id: string): any;
  getAll(): any[];
  insert(document: any): any;
  updateById(id: string, documentToUpdate: any): any;
  deleteById(id: string): any;
}

export interface IDocument {
  __id: string;
  [index: string]: any;
}

export interface IDataBaseStorage {
  [index: string]: IDocument[];
}
