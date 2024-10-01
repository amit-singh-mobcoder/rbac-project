import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboards/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
