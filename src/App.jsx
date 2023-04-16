import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";
import login from "./login";

function appLogin() {
  return (
    <main className="appLogin">
      <login/>
    </main>
  )
}

function App() {
  return (
    <div className="App">
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
