type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' ;

type Handler = (arg0: Request, arg1: Response) => (void | Promise<void>);

type Route = [string, Method, Handler];

export default Route;