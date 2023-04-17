import "./App.css";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appBar/AppBar.jsx";
import login from "./login";

// function AppLogin() {
//   return (
//     <main className="AppLogin">
//       <login/>
//     </main>
//   )
// }

function App() {
  return (
    <div className="App">
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
