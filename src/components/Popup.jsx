import PropTypes from "prop-types";

import { FaArrowRight } from "react-icons/fa";

const Popup = ({ title, onSubmit, formData, setFormData, onClose, isDarkMode }) => (
  <div className="fixed inset-0 z-50">
    <div className="bg-[#00000088] w-screen h-screen flex justify-center items-center">
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'} px-8 md:px-16 py-8 md:py-12 rounded-[45px] flex flex-col space-y-8 md:space-y-12 justify-center items-center shadow-lg w-full max-w-md mx-4 transition-colors duration-300`}>
        <div className="text-2xl md:text-4xl font-semibold tracking-wide">
          <span className={isDarkMode ? 'text-gray-200' : 'text-stone-500'}>{title}</span>
        </div>
        <form onSubmit={onSubmit} className="w-full">
          <div className="mb-4 md:mb-6">
            <label htmlFor="title" className={`block text-lg md:text-xl mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              className={`w-full shadow-md p-3 rounded-2xl focus:outline-blue-400 ${isDarkMode ? 'bg-slate-700 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="mb-4 md:mb-6">
            <label htmlFor="description" className={`block text-lg md:text-xl mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter Description"
              className={`w-full shadow-md p-3 rounded-2xl h-32 md:h-64 focus:outline-blue-400 ${isDarkMode ? 'bg-slate-700 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`text-white text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-3xl shadow-lg transition duration-300 flex justify-center items-center gap-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {title.includes("Enter") ? "Add Task" : "Edit Task"}{" "}
              <FaArrowRight />
            </button>
            <button
              type="button"
              className={`text-white text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-3xl shadow-lg transition duration-300 ml-2 md:ml-4 ${isDarkMode ? 'bg-slate-600 hover:bg-slate-700' : 'bg-gray-400 hover:bg-gray-500'}`}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  title: PropTypes.string,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
export default Popup;