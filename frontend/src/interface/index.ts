import type { Dispatch, SetStateAction } from "react";

export interface ITodo {
    todo_id: number,
    description: string
}

export interface EditTodoProps {
    todo: ITodo;
    onUpdate: (updateTodo: ITodo) => void
}

export interface DeleteTodoProps {
    todo_id: number;
    onDelete: (id: number) => void;
}
export interface InputTodoProps {
    setTodos: Dispatch<SetStateAction<ITodo[]>>;
}
export interface AuthContextType {
    isLoggedIn: boolean,
    setIsLoggedIn: (value: boolean) => void
}