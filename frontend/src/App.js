import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages and components
import Home from "../src/pages/HomePage/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/AuthPages/LoginPage/Login";
import Signup from "../src/pages/AuthPages/SignupPage/Signup";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
            
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            
          </Routes>
          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
