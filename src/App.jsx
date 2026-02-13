import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Todos from "./components/Todos";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      <div className="mx-4 md:mx-32 py-4 md:py-10">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
              isDarkMode 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-yellow-500/50' 
                : 'bg-slate-700 text-yellow-300 hover:bg-slate-600 hover:shadow-slate-400/50'
            }`}
          >
            {isDarkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
          </button>
        </div>
        <NavBar onViewChange={setCurrentView} isDarkMode={isDarkMode} />
        <Todos currentView={currentView} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default App;