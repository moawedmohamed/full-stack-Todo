import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "../interfaces/interfaces";
const JWT_SECRET: string = process.env.JWT_SECRET || "fallback_secret";

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });

    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
        req.user = { id: decoded.id };
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });

    }
}