import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </main>
  );
}

export default App;
