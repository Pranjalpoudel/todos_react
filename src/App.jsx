import { useState } from "react";
import NavBar from "./components/NavBar";
import Todos from "./components/Todos";

const App = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="mx-4 md:mx-32 my-4 md:my-10">
      <NavBar onViewChange={setCurrentView} />
      <Todos currentView={currentView} />
    </div>
  );
};

export default App;