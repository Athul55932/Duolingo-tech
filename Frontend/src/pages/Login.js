// javascript
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const { loginUser } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const navigate = useNavigate();

    const submit = async () => {
        if (!form.name || !form.password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");
        const user = await loginUser(form);

        if (!user) {
            setError("Invalid username or password");
            setLoading(false);
            return;
        }

        setLoading(false);

        if (user.role === "ADMIN") {
            navigate("/admin/dashboard");
        } else {
            navigate("/courses");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="animated-bg"></div>
            </div>

            <div className="theme-toggle">
                <button
                    className="toggle-btn"
                    onClick={() => {
                        setIsDarkMode(!isDarkMode);
                        document.documentElement.setAttribute(
                            "data-theme",
                            !isDarkMode ? "dark" : "light"
                        );
                        localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
                    }}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <div className="login-content">
                <div className="login-header">
                    <div className="logo-wrapper">
                        <span className="logo-icon">🎓</span>
                        <h1 className="logo-text">Tech Duolingo</h1>
                    </div>
                    <p className="tagline">Master Programming, One Step at a Time</p>
                </div>

                <div className="login-card">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to continue learning</p>

                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                className="form-input"
                                placeholder="Enter your username"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                className="form-input"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <button
                        className={`login-btn ${loading ? "loading" : ""}`}
                        onClick={submit}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <span className="btn-arrow">→</span>
                            </>
                        )}
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <p className="signup-text">
                        Don't have an account?{" "}
                        <button
                            className="signup-link"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up here
                        </button>
                    </p>
                </div>

                <div className="login-features">
                    <div className="feature">
                        <span className="feature-icon">⚡</span>
                        <div className="feature-content">
                            <h3>Interactive Learning</h3>
                            <p>Engage with hands-on coding challenges</p>
                        </div>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">📈</span>
                        <div className="feature-content">
                            <h3>Track Progress</h3>
                            <p>Monitor your learning journey visually</p>
                        </div>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🎯</span>
                        <div className="feature-content">
                            <h3>Achieve Goals</h3>
                            <p>Unlock achievements and badges</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
