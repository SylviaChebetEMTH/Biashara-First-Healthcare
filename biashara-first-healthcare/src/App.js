import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterBusiness from "./components/RegisterBusiness";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About";
import FindHospitals from "./components/FindHospitals";
import Contact from "./components/Contact";

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-hospitals" element={< FindHospitals />} />
        <Route path="/contact" element={< Contact />} />
      </Routes>
      </div>
      {/* <Footer /> */}
    </div>
    
  );
}
const App = () => {
  return (
    <Router>
     
        <AppContent />
      
    </Router>
  );
}

export default App;