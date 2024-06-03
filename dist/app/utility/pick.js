"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalFilters = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalFilters[key] = obj[key];
        }
    }
    return finalFilters;
};
exports.default = pick;
