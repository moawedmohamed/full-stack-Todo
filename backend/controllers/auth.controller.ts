import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db";
import jwt from "jsonwebtoken";
import { IUser, IUserLogin } from "../interfaces/interfaces";

const JWT_SECRET: string = process.env.JWT_SECRET || "fallback_secret";
export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password }: IUser = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const resultQuery = await pool.query(
            "insert into users (username,email,password) values ($1, $2, $3) RETURNING *",
            [username, email, hashPassword]
        );
        const user = resultQuery.rows[0];
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ user, token });
    } catch (err: any) {
        console.log(err);

        // إذا كان الخطأ من نوع "unique violation"
        if (err.code === "23505") {
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: IUserLogin = req.body;
    try {
        const resultQuery = await pool.query("select * from users where email=$1", [
            email,
        ]);
        const user = resultQuery.rows[0];
        if (!user) {
            res.status(400).json({ message: "User Not Found " });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "email or password is not correct" });
            return;
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
