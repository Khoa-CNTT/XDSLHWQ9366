import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/Acount/SignIn/SignIn";
import SignUp from "./pages/Acount/SìgnUp/SignUp";

function App() {
  return (
    <>
      <Router>
        <main className="overflow-x-hidden bg-white text-dark">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </>
  );
}

export default App;
