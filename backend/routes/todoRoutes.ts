import { Response, Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { pool } from "../db";
import { AuthRequest } from "../interfaces/interfaces";

const router = Router();

// * create a todo (protected)
router.post("/", verifyToken, async (req: any, res) => {
    try {
        const { description } = req.body;
        const userId = req.user.id; // مستخدم محمي بواسطة JWT
        const newTodo = await pool.query(
            "INSERT INTO todo(description, user_id) VALUES($1, $2) RETURNING *",
            [description, userId]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

// * get todos for this user (protected)
router.get("/", verifyToken, async (req: any, res) => {
    try {
        const userId = req.user.id;
        const allTodos = await pool.query("SELECT * FROM todo WHERE user_id=$1", [userId]);
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error);
    }
});

// باقي العمليات (PUT, DELETE) أيضًا نحميها بنفس الطريقة
router.put("/:id", verifyToken, async (req: any, res) => {
    try {
        const id = Number(req.params.id);
        const { description } = req.body;
        const userId = req.user.id;

        const updated = await pool.query(
            "UPDATE todo SET description=$1 WHERE todo_id=$2 AND user_id=$3 RETURNING *",
            [description, id, userId]
        );
        if (updated.rows.length === 0) return res.status(404).json({ message: "Todo not found" });
        res.json(updated.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
    try {
        const todoID = Number(req.params.id)
        const userId = req.user?.id
        if (!userId) return res.status(401).json({ msg: "Unauthorized" });
        if (isNaN(todoID)) return res.status(400).json({ msg: "Invalid id" });
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *',
            [todoID, userId]
        );
        if (deleteTodo.rows.length === 0)
            return res.status(404).json({ msg: "Todo not found" });
        res.json(deleteTodo.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
export default router;
