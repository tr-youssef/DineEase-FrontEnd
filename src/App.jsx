import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";
import { inject } from "@vercel/analytics";

function App() {
  inject();
  return (
    <div className="App">
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
