// javascript
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
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

    const handleLogout = () => {
        localStorage.removeItem("theme");
        navigate("/");
    };

    const dashboardLinks = [
        {
            to: "/admin/add-course",
            label: "Add Course",
            icon: "➕",
            description: "Create new courses for the platform"
        },
        {
            to: "/admin/add-question",
            label: "Add Question",
            icon: "❓",
            description: "Add questions to existing courses"
        },
        {
            to: "/courses",
            label: "View Courses",
            icon: "📚",
            description: "Browse and manage all courses"
        }
    ];

    return (
        <div className="admin-dashboard-container">
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

            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Admin Dashboard</h1>
                    <p className="dashboard-subtitle">Manage your tech learning platform</p>
                </div>

                <div className="dashboard-grid">
                    {dashboardLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            className="dashboard-link"
                            style={{ "--delay": `${index * 0.15}s` }}
                        >
                            <div className="link-icon">{link.icon}</div>
                            <div className="link-content">
                                <h3 className="link-title">{link.label}</h3>
                                <p className="link-description">{link.description}</p>
                            </div>
                            <div className="link-arrow">→</div>
                        </Link>
                    ))}
                </div>

                <div className="dashboard-footer">
                    <p className="footer-text">Welcome back! Choose an action to manage the platform.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
