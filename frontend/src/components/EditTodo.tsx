import { Fragment, useState, type ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { EditTodoProps } from "../interface";
export default function EditTodo({ todo, onUpdate }: EditTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const updatedData = async (todo_id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      setDescription(data.description);
      onUpdate(data);
      setIsOpen(false);
      //   window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  //*handles
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <>
        <button
          type="button"
          onClick={openModal}
          className="w-[77px]  h-8 text-md bg-blue-500 text-white rounded"
        >
          Edit
        </button>
      </>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Modal Title
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={description}
                      onChange={handleDescription}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Edit your todo"
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updatedData(todo.todo_id)}
                      type="button"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
