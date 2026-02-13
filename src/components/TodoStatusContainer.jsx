import PropTypes from "prop-types";

import { FaRegCircleCheck } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";

const TodoStatusContainer = ({
  title,
  todos,
  icon,
  onDelete,
  onChecked,
  onEdit,
  isDarkMode,
}) => {
  return (
    <div className={`shadow-2xl rounded-[5rem] ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'} px-6 md:px-12 py-6 md:py-10 w-full md:w-1/2 h-fit transition-colors duration-300`}>
      <div className="flex space-x-2 my-3 mb-6">
        <div className="flex justify-center items-center">{icon}</div>
        <div className="flex justify-center items-center text-xl font-semibold tracking-wide">
          {title}
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        {todos.map(({ id, title, status, description }) => {
          return (
            <div
              key={id}
              className={`rounded-3xl p-4 px-6 transition-colors duration-300 ${
                status == "ongoing" 
                  ? isDarkMode ? "bg-yellow-900/30 border border-yellow-700" : "bg-[#FFAA041A]"
                  : isDarkMode ? "bg-green-900/30 border border-green-700" : "bg-[#E6FAEA]"
              }`}
            >
              <div className="text-base font-medium my-2">{title}</div>
              <div className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{description}</div>
              <div className={`text-2xl flex space-x-6 justify-end ${isDarkMode ? 'text-gray-400' : 'text-[#B3B7EE]'}`}>
                <GrEdit
                  className={`cursor-pointer transition-colors duration-200 ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-500'}`}
                  onClick={() => onEdit(id)}
                />
                <RiDeleteBinLine
                  className={`cursor-pointer transition-colors duration-200 ${isDarkMode ? 'hover:text-red-400' : 'hover:text-red-500'}`}
                  onClick={() => onDelete(id)}
                />
                <FaRegCircleCheck
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => onChecked(id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TodoStatusContainer.propTypes = {
  title: PropTypes.string,
  todos: PropTypes.array,
  icon: PropTypes.element,
  onDelete: PropTypes.func,
  onChecked: PropTypes.func,
  onEdit: PropTypes.func,
};
export default TodoStatusContainer;   