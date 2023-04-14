import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";
import Test from "./components/Test.jsx";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Test />
      <Outlet />
    </div>
  );
}

export default App;
