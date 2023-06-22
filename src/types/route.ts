export type Method = 'ALL' | 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' ;

export type Handler = (req:any, res:any) => (void | Promise<void>);

export type Auth = 'none' | 'optional' | 'required' | 'admin';

type Route = [string, Method, Auth, Handler];

export default Route;