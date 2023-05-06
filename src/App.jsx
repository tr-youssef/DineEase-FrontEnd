import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Outlet />
      <Analytics />
    </div>
  );
}

export default App;
