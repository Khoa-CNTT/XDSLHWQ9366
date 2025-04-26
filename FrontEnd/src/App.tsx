import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseHomePage from "./HomePage/CourseHomePage";
import AddLecture from "./components/Lecture/AddLecture";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseHomePage />} />
          <Route path="/Lecture/add-lecture" element={<AddLecture />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
