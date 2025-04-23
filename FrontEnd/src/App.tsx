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
import Courses from "./pages/Courses/Courses";
import CourseDetail from "./pages/Courses/CourseDetail";
import Contact from "./pages/Contact/Contact";

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
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </>
  );
}

export default App;
