import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";
import { useState } from "react";
import { NotifContext } from "./utils/Context.jsx";
import { inject } from "@vercel/analytics";

function App() {
  const [NumberOfNewClient, setNumberOfNewClient] = useState(0);
  const [NumberOfOrdersReady, setNumberOfOrdersReady] = useState(0);
  inject();
  return (
    <div className="App">
      <NotifContext.Provider value={{ NumberOfNewClient, setNumberOfNewClient, NumberOfOrdersReady, setNumberOfOrdersReady }}>
        <AppBar />
        <Outlet />
      </NotifContext.Provider>
    </div>
  );
}

export default App;
