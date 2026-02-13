import { useState } from "react";

const NavBar = ({ onViewChange, isDarkMode }) => {
  const [activeView, setActiveView] = useState("home");

  const handleHomeClick = () => {
    setActiveView("home");
    if (onViewChange) {
      onViewChange("home");
    }
  };

  const handleDeletedTasksClick = () => {
    setActiveView("deleted");
    if (onViewChange) {
      onViewChange("deleted");
    }
  };

  return (
    <div className={`flex text-lg md:text-xl font-medium space-x-4 md:space-x-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <div 
        className={`cursor-pointer transition-all duration-300 ${activeView === "home" ? `underline decoration-[#578EFB] decoration-[6px] underline-offset-8 ${isDarkMode ? 'text-white' : 'text-black'}` : ''}`}
        onClick={handleHomeClick}
      >
        Home
      </div>
      <div 
        className={`cursor-pointer transition-all duration-300 ${activeView === "deleted" ? `underline decoration-[#578EFB] decoration-[6px] underline-offset-8 ${isDarkMode ? 'text-white' : 'text-black'}` : ''}`}
        onClick={handleDeletedTasksClick}
      >
        Deleted Tasks
      </div>
    </div>
  );
};

export default NavBar;