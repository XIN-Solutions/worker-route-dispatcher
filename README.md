# Route Dispatcher

The `worker-route-dispatcher` module dispatches worker requests to action handlers.

To use:

    import {RouteDispatcher} from "worker-route-dispatcher";

    const dispatcher = new RouteDispatcher();

    dispatcher.notFound(notFoundHandler);
    dispatcher.add("/post/:id*", getPostByIdAction);

Where `notFoundHandler` is:
    
    async function notFoundHandler(req, url) {
        return new Response("Not found.", { status: 404 });
    }


And matched routes have a function signature as follows:

    async function(params, req, url) { ... }

For example:

    async function getPostByIdAction({id}, req, url) {
        const idPath = id.join("/");
        return new Response(JSON.stringify({}));
    };




