import { forEach, includes, camelCase } from 'lodash';

export class Filter {
    /**
     * Fetch all relevant filters from the request.
     *
     * @param {string[]} filterKeys
     *
     * @return {object}
     */
    public static getQueryFilters (
        queries: { [key: string]: any; },
        filterKeys: string[]
    ): { [key: string]: any; } {
        const filters = {};

        forEach(queries, (value, key) => {
            if (includes(filterKeys, key)) {
                filters[camelCase(key)] = value;
            }
        });

        return filters;
    }
}
