/*
     ____  _                 _       _                 ____             _         ____                 _     _
    |  _ \(_)___ _ __   __ _| |_ ___| |__   ___ _ __  |  _ \ ___  _   _| |_ ___  |  _ \ _ __ _____   _(_) __| | ___ _ __
    | | | | / __| '_ \ / _` | __/ __| '_ \ / _ \ '__| | |_) / _ \| | | | __/ _ \ | |_) | '__/ _ \ \ / / |/ _` |/ _ \ '__|
    | |_| | \__ \ |_) | (_| | || (__| | | |  __/ |    |  _ < (_) | |_| | ||  __/ |  __/| | | (_) \ V /| | (_| |  __/ |
    |____/|_|___/ .__/ \__,_|\__\___|_| |_|\___|_|    |_| \_\___/ \__,_|\__\___| |_|   |_|  \___/ \_/ |_|\__,_|\___|_|
                |_|

    Purpose:

        To provide a set of routes for a RouteDispatcher object so swagger-scrape can use their annotated jsdocs.

 */


export class DispatcherRouteProvider {

    dispatcher;

    /**
     * Initialise data-members
     *
     * @param dispatcher {RouteDispatcher} the dispatcher to scrape routes from
     */
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    /**
     * Returns a set of Route-shaped endpoint descriptions from `this.dispatcher`.
     *
     * @returns {object[]} the routes.
     */
    scrapeRoutes() {
        return (
            (this.dispatcher?.routes ?? []).map(route => {
                return {
                    path: route.pattern,
                    method: route.method,
                    handle: route.func
                };
            })
        );
    }

}
