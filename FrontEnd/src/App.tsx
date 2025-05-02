import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseHomePage from "./HomePage/CourseHomePage";
import AddLecture from "./components/Lecture/AddLecture";
import LectureList from "./components/Lecture/LectureList";
import LectureDetail from "./components/Lecture/LectureDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseHomePage />} />
          <Route path="/Lecture/add-lecture" element={<AddLecture />} />
          <Route path="/Lecture/lectures" element={<LectureList />} />
          <Route path="/Lecture/get-lecture" element={<LectureDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
