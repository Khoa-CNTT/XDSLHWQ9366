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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Results from "./pages/Result/Result";
import TestScores from "./pages/TestScores/TestScores";
import TestScoreDetail from "./pages/TestScores/TestScoreDetail";
import News from "./pages/News/News";
import NewsDetail from "./pages/News/NewsDetail";
import Cart from "./pages/Cart/Cart";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./pages/Checkout/Checkout";
import { NotificationProvider } from "./context/NotificationContext";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <main className="overflow-x-hidden bg-white text-dark">
            <ScrollToTop />
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
              <Route path="/result" element={<Results />} />
              <Route path="/test-scores" element={<TestScores />} />
              <Route path="/test-scores/:id" element={<TestScoreDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:mabaiviet" element={<NewsDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </main>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
