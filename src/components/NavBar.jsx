import { useState } from "react";

const NavBar = ({ onViewChange }) => {
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
    <div className="flex text-xl font-medium space-x-8 text-gray-600">
      <div 
        className={`cursor-pointer ${activeView === "home" ? "underline decoration-[#578EFB] decoration-[6px] underline-offset-8 text-black" : ""}`}
        onClick={handleHomeClick}
      >
        Home
      </div>
      <div 
        className={`cursor-pointer ${activeView === "deleted" ? "underline decoration-[#578EFB] decoration-[6px] underline-offset-8 text-black" : ""}`}
        onClick={handleDeletedTasksClick}
      >
        Deleted Tasks
      </div>
    </div>
  );
};

export default NavBar;