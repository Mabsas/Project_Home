import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/" element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

/* EXPORTING CLIENT  APP*/
