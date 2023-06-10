import TestRouter from './test/TestRoute';
interface RouteTuple extends Array<string|any>{0:string; 1:any}
const routes_list:RouteTuple[] = [
    ["/test",TestRouter],
    ["/q/:id",TestRouter],
    //["/user", routeUser],
        //I think this should be able to be handled by routeUser...
        //but if it can live here if that's not possible.
        //["/user/:id",getUserById],
    //["/posts/,routePosts"],
        //see above
        //["/post/:id",getPostsById],
    //["/comments/:postID"]     //get comments of a post
        //["/comments/:commentID"]  //needed or wanted?
];
export default  routes_list
