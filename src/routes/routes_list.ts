import TestRouter from './test/TestRoute';
interface RouteTuple extends Array<string|any>{0:string; 1:any}
const routes_list:RouteTuple[] = [
    ["/test",TestRouter]
];
export default  routes_list
