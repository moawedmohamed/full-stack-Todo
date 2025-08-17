import { useEffect, useState } from "react";
import type { ITodo } from "../interface";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";
import InputTodo from "./InputTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/todos");
        const jsonData = await response.json();
        setTodos(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    getData(); // ✅ Call the function
  }, []);

  // **handlers
  const handleDeleteData = async (todo_id: number) => {
    try {
      await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== todo_id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdatedTodo = (updatedTodo: ITodo) => {
    setTodos(
      todos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      )
    );
  };
  return (
    <>
      <InputTodo setTodos={setTodos} />
      <div className="max-w-lg mt-5 flex  m-auto">
        <table className="items-center table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {todo.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <EditTodo todo={todo} onUpdate={handleUpdatedTodo} />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <DeleteTodo
                    todo_id={todo.todo_id}
                    onDelete={handleDeleteData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTodo;
