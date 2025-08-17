"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.pool = new Pool({
    user: process.env.DB_USER, // اسم المستخدم من env
    host: process.env.DB_HOST, // المضيف
    database: process.env.DB_NAME, // اسم قاعدة البيانات
    password: process.env.DB_PASS, // كلمة المرور
    port: Number(process.env.DB_PORT), // تحويل المنفذ إلى رقم
});
exports.pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.error("Connection error", err));
