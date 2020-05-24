export interface IHTTPConnection {
  request: any;
  response: any;
}

export interface IHTTPConnectionIdParams extends IHTTPConnection {
  params: { id: string };
}
