import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute(
            "data-theme",
            !isDarkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
    };

    return (
        <div className="home-container">
            <div className="home-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="animated-bg"></div>
            </div>

            <div className="theme-toggle">
                <button
                    className="toggle-btn"
                    onClick={handleThemeToggle}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <nav className="navbar">
                <div className="nav-content">
                    <div className="nav-logo">
                        <span className="nav-icon">🎓</span>
                        <span className="nav-text">Tech Duolingo</span>
                    </div>
                    <button
                        className="nav-login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            <div className="home-content">
                <section className="hero-section">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Master Programming,<br />One Step at a Time
                        </h1>
                        <p className="hero-subtitle">
                            Learn to code through interactive challenges, gamified learning, and real-world projects
                        </p>
                        <button
                            className="cta-button"
                            onClick={() => navigate("/login")}
                        >
                            Get Started
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                    <div className="hero-illustration">
                        <span className="illustration-icon">💻</span>
                    </div>
                </section>

                <section className="features-section">
                    <h2 className="section-title">Why Choose Tech Duolingo?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-card-icon">⚡</div>
                            <h3>Interactive Learning</h3>
                            <p>Engage with hands-on coding challenges designed to build real programming skills</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card-icon">🎮</div>
                            <h3>Gamified Experience</h3>
                            <p>Earn points, unlock badges, and compete with others as you progress through courses</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card-icon">📈</div>
                            <h3>Track Progress</h3>
                            <p>Monitor your learning journey with detailed analytics and performance insights</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card-icon">🎯</div>
                            <h3>Structured Courses</h3>
                            <p>Follow carefully curated courses that take you from beginner to advanced levels</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card-icon">👥</div>
                            <h3>Community Learning</h3>
                            <p>Connect with other learners, share knowledge, and grow together in our community</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card-icon">🏆</div>
                            <h3>Achieve Goals</h3>
                            <p>Set milestones and celebrate your achievements with our comprehensive rewards system</p>
                        </div>
                    </div>
                </section>

                <section className="courses-preview-section">
                    <h2 className="section-title">Explore Our Courses</h2>
                    <div className="courses-preview">
                        <div className="course-preview-card">
                            <div className="course-icon">🐍</div>
                            <h3>Python Basics</h3>
                            <p>Start your programming journey with Python's simple and elegant syntax</p>
                            <span className="course-level">Beginner</span>
                        </div>
                        <div className="course-preview-card">
                            <div className="course-icon">☕</div>
                            <h3>Java Fundamentals</h3>
                            <p>Master object-oriented programming with one of the most popular languages</p>
                            <span className="course-level">Beginner</span>
                        </div>
                        <div className="course-preview-card">
                            <div className="course-icon">⚛️</div>
                            <h3>React Development</h3>
                            <p>Build modern web applications with React and create interactive user interfaces</p>
                            <span className="course-level">Intermediate</span>
                        </div>
                    </div>
                </section>

                <section className="stats-section">
                    <div className="stat-item">
                        <div className="stat-number">50K+</div>
                        <div className="stat-label">Active Learners</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">100+</div>
                        <div className="stat-label">Coding Challenges</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Programming Languages</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">95%</div>
                        <div className="stat-label">Success Rate</div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Ready to Start Learning?</h2>
                    <p>Join thousands of students already mastering programming with Tech Duolingo</p>
                    <button
                        className="cta-button-secondary"
                        onClick={() => navigate("/login")}
                    >
                        Sign In Now
                        <span className="btn-arrow">→</span>
                    </button>
                </section>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 Tech Duolingo. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#contact">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
