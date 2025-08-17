import { log } from 'console';
import pg from 'pg';
import { startupSnapshot } from 'v8';
const { Pool } = pg;

export const pool = new Pool({
    user: process.env.DB_USER,       // اسم المستخدم من env
    host: process.env.DB_HOST,       // المضيف
    database: process.env.DB_NAME,   // اسم قاعدة البيانات
    password: process.env.DB_PASS,   // كلمة المرور
    port: Number(process.env.DB_PORT), // تحويل المنفذ إلى رقم
});

pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.error("Connection error", err));
