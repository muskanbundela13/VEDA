import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home/Home"
import Subject from "./pages/Subject/Subject"
import Topic from "./pages/Topic/Topic"
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects/:subjectId" element={<Subject />} />
          <Route path="/subjects/:subjectId/:topicId" element={<Topic />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App