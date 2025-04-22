import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/Account/SignIn/SignIn";
import SignUp from "./pages/Account/SignUp/SignUp";
import About from "./pages/About/About";
import ForgotPassword from "./pages/Account/ForgotPass/ForgotPass";
import ExamSchedule from "./pages/ExamSchedule/ExamSchedule";
import ExamDetail from "./pages/ExamSchedule/ExamDetail";

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
            <Route path="/about" element={<About />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/exam-schedule" element={<ExamSchedule />} />
            <Route path="/exam/:id" element={<ExamDetail />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </>
  );
}

export default App;
