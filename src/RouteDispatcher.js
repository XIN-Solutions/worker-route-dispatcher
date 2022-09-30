/*
     ____             _       ____  _                 _       _
    |  _ \ ___  _   _| |_ ___|  _ \(_)___ _ __   __ _| |_ ___| |__   ___ _ __
    | |_) / _ \| | | | __/ _ \ | | | / __| '_ \ / _` | __/ __| '_ \ / _ \ '__|
    |  _ < (_) | |_| | ||  __/ |_| | \__ \ |_) | (_| | || (__| | | |  __/ |
    |_| \_\___/ \__,_|\__\___|____/|_|___/ .__/ \__,_|\__\___|_| |_|\___|_|
                                         |_|

    Purpose:

        To add routes to, and match incoming paths against.

 */

import pathMatch from 'path-match';

const route = pathMatch();

export class RouteDispatcher {

    notFoundFunc;
    routes;

    /**
     * Initialise data-members
     */
    constructor() {
        this.routes = [];
    }

    /**
     * Add a route with a particular pattern to the list of routes
     *
     * @param method {'GET'|'POST'|'PUT'|'DELETE'|'OPTIONS'} the method to match for
     * @param pattern {string} the pattern to add
     * @param func {Function<Promise<*>>} the asynchronous function to call into
     */
    add(method, pattern, func) {
        this.routes.push({
            method,
            pattern,
            matcher: route(pattern),
            func
        });
    }

    /**
     * Add a route that is called when no dispatcher routes match a url
     *
     * @param func {Function<Promise<*>>} the asynchronous function to call into
     */
    notFound(func) {
        this.notFoundFunc = func;
    }

    /**
     * Try to dispatch a complete url to the correct route.
     *
     * @param fullUrl {string} the full url
     * @param req {Request}
     * @returns {Promise<null|*>}
     */
    async dispatch(fullUrl, req) {
        const url = new URL(fullUrl).pathname;
        const requestMethod = req.method?.toLowerCase() ?? 'get';

        for (const route of this.routes) {

            // correct method?
            const routeMethod = (route.method || 'get').toLowerCase();
            if (requestMethod !== routeMethod) {
                continue;
            }

            const params = route.matcher(url);
            if (params === false) {
                continue;
            }

            const response = await route.func(params, req, url);

            // not wrapped in a response yet?
            if (response?.constructor?.name === "Response") {
                return response;
            }

            return new Response(
                JSON.stringify(response), {
                    headers: { "Content-Type": "application/json"}
                }
            );
        }

        if (this.notFoundFunc) {
            return await this.notFoundFunc(req, url);
        }
        return null;
    }


}
