"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInstance = exports.isEmail = exports.makeId = exports.tap = void 0;
const path_1 = require("path");
const HigherOrderTapProxy_1 = require("./HigherOrderTapProxy");
function tap(value, callback) {
    if (callback === undefined) {
        return new HigherOrderTapProxy_1.HigherOrderTapProxy(value);
    }
    const result = callback(value);
    if (result !== undefined) {
        return result;
    }
    return value;
}
exports.tap = tap;
function makeId(length = 7) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
exports.makeId = makeId;
function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
exports.isEmail = isEmail;
async function makeInstance(cls, args) {
    cls = await Promise.resolve(`${(0, path_1.resolve)(`src/${cls}`)}`).then(s => __importStar(require(s)));
    const stdClass = Object.values(cls)[0];
    return new stdClass(...args);
}
exports.makeInstance = makeInstance;
//# sourceMappingURL=helpers.js.map