import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Game from "./pages/ Game";   // removed extra space
import Result from "./pages/Result";

import { AuthProvider } from "./context/AuthContext";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./pages/admin/AddCourse";
import AddQuestion from "./pages/admin/AddQuestion";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/game/:courseId" element={<Game />} />
                    <Route path="/result" element={<Result />} />

                    {/* Admin routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/add-course" element={<AddCourse />} />
                    <Route path="/admin/add-question" element={<AddQuestion />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
