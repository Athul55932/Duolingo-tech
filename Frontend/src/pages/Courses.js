// javascript
import { useEffect, useState } from "react";
import { getCourses } from "../api/courseApi";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        getCourses()
            .then((res) => {
                console.log("Courses fetched:", res.data);
                setCourses(res.data);
            })
            .catch((err) => console.error("Error fetching courses:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("theme");
        navigate("/");
    };

    const getCourseEmoji = (index) => {
        const emojis = ["🚀", "🧠", "💻", "⚡", "🎯", "🔥", "✨", "🎨"];
        return emojis[index % emojis.length];
    };

    if (loading)
        return (
            <div className="courses-container loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Loading courses...</p>
            </div>
        );

    if (!courses.length)
        return (
            <div className="courses-container empty-container">
                <div className="empty-state">
                    <h2 className="empty-title">📚 No Courses Available</h2>
                    <p className="empty-description">
                        Come back soon for exciting new courses!
                    </p>
                </div>
            </div>
        );

    return (
        <div className="courses-container">
            <div className="theme-toggle">
                <button
                    className={`toggle-btn ${isDarkMode ? "dark" : "light"}`}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <div className="logout-btn-wrapper">
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                    title="Logout and return to homepage"
                >
                    🚪 Logout
                </button>
            </div>

            <div className="courses-content">
                <div className="courses-header">
                    <h1 className="courses-title">📖 Choose Your Course</h1>
                    <p className="courses-subtitle">
                        Start learning and master new skills today!
                    </p>
                </div>

                <div className="courses-grid">
                    {courses.map((course, index) => (
                        <div
                            key={course.id}
                            className="course-card"
                            style={{ "--delay": `${index * 0.1}s` }}
                        >
                            <div className="course-emoji">
                                {getCourseEmoji(index)}
                            </div>
                            <div className="course-content">
                                <h3 className="course-name">{course.courseName}</h3>
                                <p className="course-description">
                                    {course.description || "Master this course"}
                                </p>
                            </div>
                            <button
                                className="course-btn"
                                onClick={() => navigate(`/game/${course.id}`)}
                            >
                                Start 🎮
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Courses;
