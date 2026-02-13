import { useState, useEffect } from "react";

import TodoStatusContainer from "./TodoStatusContainer";

import { FaCheck } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import { todosList } from "../assets/json/todos.json";
import DeleteConfirmation from "./Deleteconfirmation";
import Popup from "./Popup";

const Todos = ({ currentView = "home" }) => {
  // Load todos from localStorage or use initial data
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : todosList;
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [newTodoFormData, setNewTodoFormData] = useState({
    title: "",
    description: "",
  });

  const [editTodoFormData, setEditTodoFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const [isCreateTodoActive, setIsCreateTodoActive] = useState(false);

  const [editTodoID, setEditTodoID] = useState(null);
  const [isEditTodoActive, setIsEditTodoActive] = useState(false);

  const [deleteTodoID, setDeleteTodoID] = useState(null);
  const [deleteTaskConfirmation, setDeleteTaskConfirmation] = useState(false);
  
  const [permanentDeleteID, setPermanentDeleteID] = useState(null);
  const [permanentDeleteConfirmation, setPermanentDeleteConfirmation] = useState(false);

  // Function to filter todos based on status
  const filterTodos = (status) => {
    return todos.filter((todo) => todo.status === status && todo.status !== "deleted");
  };

  // Handler for creating a new todo
  const handleCreateTodo = (e) => {
    e.preventDefault();

    // Placeholder for API call to add new todo
    // Actual API call would fetch the new todo's ID from the backend
    const newTodo = { ...newTodoFormData, id: todos.length, status: "ongoing" };
    setTodos([...todos, newTodo]);

    // Clear form data and close create todo popup
    setNewTodoFormData({ title: "", description: "" });
    setIsCreateTodoActive(false);
  };

  // Handler for editing an existing todo
  const handleEditTodo = (e) => {
    e.preventDefault();

    // Placeholder for API call to update the todo in the backend with editTodoFormData
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodoID ? editTodoFormData : todo
    );

    setTodos(updatedTodos);
    setEditTodoID(null);
    setIsEditTodoActive(false);
  };

  // Handler for marking a todo as completed
  const handleCheckedTodo = (id) => {
    const updatedTodoList = todos.map((todo) => {
      if (id === todo.id) {
        todo.status = "completed";
      }
      return todo;
    });

    setTodos(updatedTodoList);
  };

  // Handler for deleting a todo
  const handleDeleteTodo = () => {
    // Change the status of the todo to "deleted" instead of removing it
    const updatedTodoList = todos.map(todo => 
      todo.id === deleteTodoID ? { ...todo, status: "deleted" } : todo
    );

    setTodos(updatedTodoList);
    setDeleteTodoID(null);
    setDeleteTaskConfirmation(false);
  };

  // Function to show delete confirmation popup
  const showDeleteConfirmation = (id) => {
    setDeleteTodoID(id);
    setDeleteTaskConfirmation(true);
  };

  // Function to show edit todo popup
  const showEditTodo = (id) => {
    const selectedTodo = todos.filter((todo) => todo.id === id)[0];
    setEditTodoID(id);
    setEditTodoFormData(selectedTodo);
    setIsEditTodoActive(true);
  };

  // Function to filter deleted todos
  const filterDeletedTodos = () => {
    return todos.filter((todo) => todo.status === "deleted");
  };

  // Handler for showing permanent delete confirmation
  const showPermanentDeleteConfirmation = (id) => {
    setPermanentDeleteID(id);
    setPermanentDeleteConfirmation(true);
  };

  // Handler for permanently deleting a todo
  const handlePermanentDelete = () => {
    const updatedTodoList = todos.filter((todo) => todo.id !== permanentDeleteID);
    setTodos(updatedTodoList);
    setPermanentDeleteID(null);
    setPermanentDeleteConfirmation(false);
  };

  return (
    <>
      <div id="title" className="text-stone-500 text-2xl md:text-4xl font-black my-6 md:my-12">
        {currentView === "deleted" ? "Deleted Tasks" : (
          <>
            Organize your <span className="text-black">To-Dos</span>
          </>
        )}
      </div>
      
      {currentView === "deleted" ? (
        <div className="flex justify-center">
          <div className="shadow-2xl rounded-[5rem] bg-white px-6 md:px-12 py-6 md:py-10 w-full max-w-3xl">
            <div className="flex space-x-2 my-3 mb-6">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 bg-red-200 p-2 rounded-md">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </div>
              <div className="flex justify-center items-center text-xl font-semibold tracking-wide">
                Deleted Tasks
              </div>
            </div>
            <div className="flex flex-col space-y-10">
              {filterDeletedTodos().length > 0 ? (
                filterDeletedTodos().map(({ id, title, description }) => (
                  <div
                    key={id}
                    className="bg-red-50 rounded-3xl p-4 px-6"
                  >
                    <div className="text-base font-medium my-2">{title}</div>
                    <div className="text-sm text-gray-800 mb-6">{description}</div>
                    <div className="text-right">
                      <button 
                        onClick={() => showPermanentDeleteConfirmation(id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Permanently Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No deleted tasks
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:space-x-16 space-y-8 md:space-y-0">
            <TodoStatusContainer
              title="Ongoing"
              todos={filterTodos("ongoing")}
              icon={
                <FaArrowRotateRight
                  className="bg-yellow-400 text-white p-2 rounded-md"
                  size={30}
                />
              }
              onDelete={showDeleteConfirmation}
              onChecked={handleCheckedTodo}
              onEdit={showEditTodo}
            />
            <TodoStatusContainer
              title="Completed"
              todos={filterTodos("completed")}
              icon={
                <FaCheck
                  className="bg-green-500 text-white p-2 rounded-md"
                  size={30}
                />
              }
              onDelete={showDeleteConfirmation}
              onChecked={handleCheckedTodo}
              onEdit={showEditTodo}
            />
          </div>
          <div className="flex justify-center items-center mt-8 md:mt-16">
            <div
              className="bg-blue-500 text-white text-lg md:text-xl rounded-3xl p-4 md:p-8 py-2 md:py-3 font-semibold tracking-wide flex justify-center items-center gap-4 cursor-pointer shadow-2xl"
              onClick={() => setIsCreateTodoActive(true)}
            >
              Add a Task{" "}
              <IoIosAddCircle className="inline cursor-pointer" size={30} />
            </div>
          </div>
        </>
      )}

      {/* Create New Todo Popup */}
      {isCreateTodoActive && (
        <Popup
          title="Enter Task Details"
          onSubmit={handleCreateTodo}
          formData={newTodoFormData}
          setFormData={setNewTodoFormData}
          onClose={() => setIsCreateTodoActive(false)}
        />
      )}

      {/* Edit Todo Popup */}
      {isEditTodoActive && (
        <Popup
          title="Edit Task Details"
          onSubmit={handleEditTodo}
          formData={editTodoFormData}
          setFormData={setEditTodoFormData}
          onClose={() => setIsEditTodoActive(false)}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteTaskConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDeleteTodo}
          onCancel={() => setDeleteTaskConfirmation(false)}
        />
      )}
      
      {/* Permanent Delete Confirmation Popup */}
      {permanentDeleteConfirmation && (
        <DeleteConfirmation
          title="Permanently Delete Task?"
          message="This action cannot be undone. The task will be permanently removed."
          onConfirm={handlePermanentDelete}
          onCancel={() => setPermanentDeleteConfirmation(false)}
        />
      )}
    </>
  );
};

export default Todos;