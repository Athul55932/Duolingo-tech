import { useEffect, useState, useContext } from "react";
import { startGame, submitGame } from "../api/gameApi";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Game.css";

function Game() {
    const { courseId } = useParams(); // ✅ route param must be /game/:courseId
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    // ✅ Theme toggle persistence
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    // ✅ Load questions for this course
    useEffect(() => {
        setLoading(true);
        startGame(courseId)
            .then((res) => setQuestions(res.data))
            .catch((err) => console.error("Error loading questions:", err))
            .finally(() => setLoading(false));
    }, [courseId]);

    const selectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer !== null) {
            const currentQuestion = questions[currentQuestionIndex];
            setAnswers((prev) => [
                ...prev.filter(
                    (a) => a.questionId !== (currentQuestion.id || currentQuestion._id)
                ),
                {
                    questionId: currentQuestion.id || currentQuestion._id,
                    selectedAnswer,
                },
            ]);
            setSelectedAnswer(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const handleSubmit = async () => {
        if (!user) {
            alert("You must be logged in to submit the quiz.");
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const finalAnswers = [
            ...answers.filter(
                (a) => a.questionId !== (currentQuestion.id || currentQuestion._id)
            ),
            {
                questionId: currentQuestion.id || currentQuestion._id,
                selectedAnswer,
            },
        ];

        const payload = {
            userId: user.id || user._id, // ✅ safe access
            courseId,
            answers: finalAnswers,
        };

        try {
            const res = await submitGame(payload);
            navigate("/result", { state: res.data });
        } catch (error) {
            console.error("Error submitting game:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    // ✅ Loading state
    if (loading) {
        return (
            <div className="game-container loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Loading questions...</p>
            </div>
        );
    }

    // ✅ No questions state
    if (!questions || questions.length === 0) {
        return (
            <div className="game-container empty-container">
                <div className="empty-state">
                    <h2 className="empty-title">❌ No Questions Found</h2>
                    <p className="empty-description">
                        No questions available for this course. Please try another course.
                    </p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="game-container">
            {/* ✅ Theme toggle */}
            <div className="theme-toggle">
                <button
                    className={`toggle-btn ${isDarkMode ? "dark" : "light"}`}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <div className="game-content">
                <div className="game-header">
                    <h1 className="game-title">🎮 Quiz Challenge</h1>

                </div>

                {/* ✅ Progress bar */}
                <div className="progress-section">
                    <div className="progress-info">
                        <span className="progress-text">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* ✅ Question card */}
                <div className="question-card">
                    <div className="question-header">
                        <span className="question-number">
                            Question {currentQuestionIndex + 1}
                        </span>
                        <span className="question-emoji">❓</span>
                    </div>

                    <h2 className="question-text">{currentQuestion.questionText}</h2>

                    <div className="options-container">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn ${
                                    selectedAnswer === option ? "selected" : ""
                                }`}
                                onClick={() => selectAnswer(option)}
                            >
                                <span className="option-letter">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className="option-text">{option}</span>
                                <span className="option-checkmark">
                                    {selectedAnswer === option && "✓"}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="action-buttons">
                        {!isLastQuestion ? (
                            <button
                                className="next-btn"
                                onClick={handleNext}
                                disabled={selectedAnswer === null}
                            >
                                Next Question →
                            </button>
                        ) : (
                            <button
                                className="submit-btn"
                                onClick={handleSubmit}
                                disabled={selectedAnswer === null}
                            >
                                Submit Quiz ✓
                            </button>
                        )}
                    </div>
                </div>

                {/* ✅ Stats */}
                <div className="quiz-stats">
                    <div className="stat-item">
                        <span className="stat-label">Questions Left</span>
                        <span className="stat-value">
                            {questions.length - currentQuestionIndex - 1}
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Answered</span>
                        <span className="stat-value">{answers.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
