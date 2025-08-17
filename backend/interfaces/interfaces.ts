import { Request } from "express";
export interface ITypes {
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string; // مخزن مشفر
}

export interface IUserLogin {
    email: string;
    password: string;
}
export interface AuthRequest extends Request {
    user?: { id: number };
   
}