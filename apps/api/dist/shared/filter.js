"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
const lodash_1 = require("lodash");
class Filter {
    static getQueryFilters(queries, filterKeys) {
        const filters = {};
        (0, lodash_1.forEach)(queries, (value, key) => {
            if ((0, lodash_1.includes)(filterKeys, key)) {
                filters[(0, lodash_1.camelCase)(key)] = value;
            }
        });
        return filters;
    }
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map