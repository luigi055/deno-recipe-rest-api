export interface IHTTPConnection {
  request: any;
  response: any;
  params: object;
}

export interface IHTTPConnectionIdParams extends IHTTPConnection {
  params: { id: string };
}
