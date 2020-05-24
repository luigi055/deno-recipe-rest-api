class Collection {
  private _collectionName: string = "";
  constructor(collectionName: string) {
    this._collectionName = collectionName;
  }

  toString() {
    return this._collectionName;
  }
}

export default Collection;
