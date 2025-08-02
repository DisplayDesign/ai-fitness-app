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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = exports.db = exports.auth = void 0;
// 型定義のエクスポート
__exportStar(require("./types"), exports);
// ユーティリティのエクスポート
__exportStar(require("./utils"), exports);
// Firebase設定のエクスポート
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return firebase_1.auth; } });
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return firebase_1.db; } });
var firebase_2 = require("./firebase");
Object.defineProperty(exports, "firebaseApp", { enumerable: true, get: function () { return __importDefault(firebase_2).default; } });
