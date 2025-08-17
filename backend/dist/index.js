"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes")); // مسار الـ router
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
//* middlewares 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/todos', todoRoutes_1.default);
app.use('/auth', authRoutes_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`the server running on ${PORT}`);
});
