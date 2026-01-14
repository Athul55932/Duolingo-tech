// javascript
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Result.css";

function Result() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    if (!state) {
        return (
            <div className="result-container empty-container">
                <div className="empty-state">
                    <div className="empty-emoji">📭</div>
                    <h2 className="empty-title">No Results Available</h2>
                    <p className="empty-description">
                        Complete a quiz to see your results here.
                    </p>
                    <button
                        className="back-btn"
                        onClick={() => navigate("/courses")}
                    >
                        ← Back to Courses
                    </button>
                </div>
                <div className="theme-toggle">
                    <button
                        className="toggle-btn"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                        {isDarkMode ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
        );
    }

    const { score, correctAnswers, totalQuestions } = state;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const answeredQuestions = correctAnswers;
    const wrongAnswers = totalQuestions - correctAnswers;

    // Rating based on percentage
    const getRating = () => {
        if (percentage >= 90) return { emoji: "🏆", text: "Outstanding!", color: "gold" };
        if (percentage >= 80) return { emoji: "🌟", text: "Excellent!", color: "blue" };
        if (percentage >= 70) return { emoji: "👍", text: "Great Job!", color: "green" };
        if (percentage >= 60) return { emoji: "✨", text: "Good Work!", color: "purple" };
        return { emoji: "💪", text: "Keep Trying!", color: "orange" };
    };

    // Suggestions based on performance
    const getSuggestions = () => {
        if (percentage >= 90) {
            return [
                "🎯 You're a quiz master! Try harder courses.",
                "📚 Consider teaching others to reinforce your knowledge.",
                "🚀 You're ready for advanced challenges!",
            ];
        }
        if (percentage >= 80) {
            return [
                "⭐ Excellent performance! Review any weak areas.",
                "📖 Try the course again to achieve 90%+.",
                "💡 You're close to mastery!",
            ];
        }
        if (percentage >= 70) {
            return [
                "📚 Good effort! Review the topics you found tricky.",
                "🔄 Retake the quiz after studying more.",
                "💪 You're on the right track!",
            ];
        }
        if (percentage >= 60) {
            return [
                "📖 Study the course material more carefully.",
                "🔁 Retake the quiz after reviewing.",
                "💭 Focus on the questions you got wrong.",
            ];
        }
        return [
            "📚 Review all the course material thoroughly.",
            "🔄 Try the quiz again after studying more.",
            "⏱️ Take your time and focus on understanding concepts.",
        ];
    };

    const rating = getRating();
    const suggestions = getSuggestions();

    return (
        <div className="result-container">
            <div className="theme-toggle">
                <button
                    className="toggle-btn"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <div className="result-content">
                {/* Header */}
                <div className="result-header">
                    <h1 className="result-title">Quiz Complete! 🎉</h1>
                    <p className="result-subtitle">
                        Here's how you performed on this assessment.
                    </p>
                </div>

                {/* Score Card */}
                <div className="score-card">
                    <div className="rating-container">
                        <div className="rating-emoji">{rating.emoji}</div>
                        <div className="rating-text">{rating.text}</div>
                    </div>

                    {/* Circular Progress */}
                    <div className="circular-progress-container">
                        <svg
                            className="circular-progress"
                            width="220"
                            height="220"
                            viewBox="0 0 220 220"
                        >
                            <circle
                                cx="110"
                                cy="110"
                                r="100"
                                className="progress-background"
                            />
                            <circle
                                cx="110"
                                cy="110"
                                r="100"
                                className="progress-fill"
                                style={{
                                    strokeDasharray: `${(percentage / 100) * 628} 628`,
                                }}
                            />
                        </svg>
                        <div className="progress-text">
                            <div className="progress-percentage">{percentage}%</div>
                            <div className="progress-label">Score</div>
                        </div>
                    </div>

                    <div className="score-details">
                        <div className="score-item correct">
                            <div className="score-icon">✓</div>
                            <div className="score-info">
                                <span className="score-label">Correct</span>
                                <span className="score-number">{correctAnswers}</span>
                            </div>
                        </div>
                        <div className="score-item wrong">
                            <div className="score-icon">✕</div>
                            <div className="score-info">
                                <span className="score-label">Wrong</span>
                                <span className="score-number">{wrongAnswers}</span>
                            </div>
                        </div>
                        <div className="score-item total">
                            <div className="score-icon">∑</div>
                            <div className="score-info">
                                <span className="score-label">Total</span>
                                <span className="score-number">{totalQuestions}</span>
                            </div>
                        </div>
                    </div>
                </div>

                // javascript
                {/* Progress Breakdown */}
                <div className="progress-breakdown">
                    <h3 className="breakdown-title">Performance Breakdown</h3>
                    <div className="breakdown-bar">
                        <div
                            className="breakdown-correct"
                            style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
                        >
                            {(correctAnswers / totalQuestions) * 100 > 15 && (
                                <span className="breakdown-label">{correctAnswers} Correct</span>
                            )}
                        </div>
                        <div
                            className="breakdown-wrong"
                            style={{ width: `${(wrongAnswers / totalQuestions) * 100}%` }}
                        >
                            {(wrongAnswers / totalQuestions) * 100 > 15 && (
                                <span className="breakdown-label">{wrongAnswers} Wrong</span>
                            )}
                        </div>
                    </div>
                    <div className="breakdown-stats">
                        <div className="breakdown-stat">
                            <span className="stat-color correct-color"></span>
                            <span className="stat-text">
                                {((correctAnswers / totalQuestions) * 100).toFixed(1)}% Correct
                            </span>
                        </div>
                        <div className="breakdown-stat">
                            <span className="stat-color wrong-color"></span>
                            <span className="stat-text">
                                {((wrongAnswers / totalQuestions) * 100).toFixed(1)}% Wrong
                            </span>
                        </div>
                    </div>
                </div>


                {/* Suggestions */}
                <div className="suggestions-container">
                    <h3 className="suggestions-title">💡 Suggestions</h3>
                    <div className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className="suggestion-item">
                                <p className="suggestion-text">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Badge */}
                {percentage >= 70 && (
                    <div className="achievement-section">
                        <div className="achievement-badge">
                            <span className="badge-emoji">🎖️</span>
                            <span className="badge-text">Achievement Unlocked!</span>
                        </div>
                        <p className="achievement-message">
                            {percentage >= 90
                                ? "You're a quiz master! 🌟"
                                : percentage >= 80
                                    ? "You've shown great understanding!"
                                    : "You're making excellent progress!"}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button
                        className="retry-btn"
                        onClick={() => navigate("/courses")}
                    >
                        ← Back to Courses
                    </button>
                    <button
                        className="home-btn"
                        onClick={() => navigate("/")}
                    >
                        Go to Home →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;
