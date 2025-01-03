"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = void 0;
const deepCopy = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        const copyArr = [];
        for (let i = 0; i < obj.length; i++) {
            copyArr[i] = deepCopy(obj[i]);
        }
        return copyArr;
    }
    const copyObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copyObj[key] = deepCopy(obj[key]);
        }
    }
    return copyObj;
};
exports.deepCopy = deepCopy;
