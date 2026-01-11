// javascript
import { useState, useEffect } from "react";
import { addCourse } from "../../api/adminApi";
import "./AddCourse.css";

function AddCourse() {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const submit = async () => {
        if (!courseName.trim() || !description.trim()) {
            alert("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            await addCourse({ courseName, description });
            alert("Course Added Successfully! 🎉");
            setCourseName("");
            setDescription("");
        } catch (error) {
            alert("Error adding course. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-course-container">
            <div className="theme-toggle">
                <button
                    className={`toggle-btn ${isDarkMode ? "dark" : "light"}`}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <div className="form-card">
                <div className="form-header">
                    <h2 className="form-title">Create New Course</h2>
                    <p className="form-subtitle">Add a new course to your tech learning platform</p>
                </div>

                <div className="form-group">
                    <label className="form-label">Course Name</label>
                    <input
                        placeholder="e.g., JavaScript Fundamentals"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="form-input"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        placeholder="Describe what students will learn in this course..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                        rows="5"
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    onClick={submit}
                    className="btn-submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Course"}
                </button>

                <div className="form-footer">
                    <p className="footer-hint">💡 Tip: Use clear and descriptive names for better course organization</p>
                </div>
            </div>
        </div>
    );
}

export default AddCourse;
