import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";


function App() {
  return (
    <div className="App">
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
