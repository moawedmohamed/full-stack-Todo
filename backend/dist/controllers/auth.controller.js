"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashPassword = await bcryptjs_1.default.hash(password, 10);
        const resultQuery = await db_1.pool.query("insert into users (username,email,password) values ($1, $2, $3) RETURNING *", [username, email, hashPassword]);
        const user = resultQuery.rows[0];
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ user, token });
    }
    catch (err) {
        console.log(err);
        // إذا كان الخطأ من نوع "unique violation"
        if (err.code === "23505") {
            res.status(400).json({ message: "Email already exists" });
        }
        else {
            res.status(500).json({ message: "Server error" });
        }
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const resultQuery = await db_1.pool.query("select * from users where email=$1", [
            email,
        ]);
        const user = resultQuery.rows[0];
        if (!user) {
            res.status(400).json({ message: "User Not Found " });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "email or password is not correct" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ user, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
