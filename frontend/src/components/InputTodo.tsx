import { useState, type ChangeEvent, type FormEvent } from "react";
import type { InputTodoProps, ITodo } from "../interface";

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const [description, setDescription] = useState<string>("");

  //* handlers
  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data: ITodo = await response.json();
      setTodos((prev) => [...prev, data]);
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(() => e.target.value);
  };
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Pern Todo List
      </h1>

      <form className="flex items-center gap-3" onSubmit={onSubmitForm}>
        <input
          value={description}
          onChange={handleDescription}
          type="text"
          placeholder="Add a new task..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
