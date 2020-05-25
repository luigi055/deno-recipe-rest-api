import { IDataBase } from "./../services/db/types.d.ts";

export interface IHTTPConnection {
  request: any;
  response: any;
  params: object;
}

export interface IHTTPConnectionIdParams extends IHTTPConnection {
  params: { id: string };
}
