import { useState, useEffect } from "react";

import TodoStatusContainer from "./TodoStatusContainer";

import { FaCheck } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import { todosList } from "../assets/json/todos.json";
import DeleteConfirmation from "./Deleteconfirmation";
import Popup from "./Popup";

const Todos = ({ currentView = "home", isDarkMode = true }) => {
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

  const [selectedDeletedTasks, setSelectedDeletedTasks] = useState(new Set());

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

  // Handler for selecting/deselecting a deleted task
  const handleSelectDeletedTask = (id) => {
    const newSelected = new Set(selectedDeletedTasks);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDeletedTasks(newSelected);
  };

  // Handler for selecting all deleted tasks
  const handleSelectAllDeletedTasks = () => {
    const deletedTodos = filterDeletedTodos();
    if (selectedDeletedTasks.size === deletedTodos.length) {
      setSelectedDeletedTasks(new Set());
    } else {
      const allIds = new Set(deletedTodos.map(todo => todo.id));
      setSelectedDeletedTasks(allIds);
    }
  };

  // Handler for deleting selected tasks
  const handleDeleteSelectedTasks = () => {
    const updatedTodoList = todos.filter((todo) => !selectedDeletedTasks.has(todo.id));
    setTodos(updatedTodoList);
    setSelectedDeletedTasks(new Set());
  };

  return (
    <>
      <div id="title" className={`text-2xl md:text-4xl font-black my-6 md:my-12 ${isDarkMode ? 'text-gray-200' : 'text-stone-500'}`}>
        {currentView === "deleted" ? "Deleted Tasks" : (
          <>
            Organize your <span className={isDarkMode ? 'text-blue-400' : 'text-black'}>To-Dos</span>
          </>
        )}
      </div>
      
      {currentView === "deleted" ? (
        <div className="flex justify-center">
          <div className={`shadow-2xl rounded-[5rem] ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'} px-6 md:px-12 py-6 md:py-10 w-full max-w-3xl transition-colors duration-300`}>
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
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectedDeletedTasks.size === filterDeletedTodos().length && filterDeletedTodos().length > 0}
                  onChange={handleSelectAllDeletedTasks}
                  className="w-5 h-5 cursor-pointer"
                />
                <label htmlFor="selectAll" className={`cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select All
                </label>
              </div>
              {selectedDeletedTasks.size > 0 && (
                <button
                  onClick={handleDeleteSelectedTasks}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Delete Selected ({selectedDeletedTasks.size})
                </button>
              )}
            </div>
            <div className="flex flex-col space-y-10">
              {filterDeletedTodos().length > 0 ? (
                filterDeletedTodos().map(({ id, title, description }) => (
                  <div
                    key={id}
                    className={`rounded-3xl p-4 px-6 flex items-start gap-3 ${isDarkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50'}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDeletedTasks.has(id)}
                      onChange={() => handleSelectDeletedTask(id)}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="text-base font-medium my-2">{title}</div>
                      <div className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{description}</div>
                      <div className="text-right">
                        <button 
                          onClick={() => showPermanentDeleteConfirmation(id)}
                          className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                        >
                          Permanently Delete
                        </button>
                      </div>
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
              isDarkMode={isDarkMode}
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
              isDarkMode={isDarkMode}
            />
          </div>
          <div className="flex justify-center items-center mt-8 md:mt-16">
            <div
              className={`text-white text-lg md:text-xl rounded-3xl p-4 md:p-8 py-2 md:py-3 font-semibold tracking-wide flex justify-center items-center gap-4 cursor-pointer shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/50' : 'bg-blue-500 hover:bg-blue-600'}`}
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
          isDarkMode={isDarkMode}
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
          isDarkMode={isDarkMode}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteTaskConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDeleteTodo}
          onCancel={() => setDeleteTaskConfirmation(false)}
          isDarkMode={isDarkMode}
        />
      )}
      
      {/* Permanent Delete Confirmation Popup */}
      {permanentDeleteConfirmation && (
        <DeleteConfirmation
          title="Permanently Delete Task?"
          message="This action cannot be undone. The task will be permanently removed."
          onConfirm={handlePermanentDelete}
          onCancel={() => setPermanentDeleteConfirmation(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default Todos;