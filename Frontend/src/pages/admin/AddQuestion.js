// javascript
import { useEffect, useState } from "react";
import { addQuestion } from "../../api/adminApi";
import { getCourses } from "../../api/courseApi";
import "./AddQuestion.css";

function AddQuestion() {
    const [courses, setCourses] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const [form, setForm] = useState({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        courseId: ""
    });

    useEffect(() => {
        getCourses().then((res) => setCourses(res.data));
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const updateOption = (i, val) => {
        const opts = [...form.options];
        opts[i] = val;
        setForm({ ...form, options: opts });
    };

    const handleCourseChange = (e) => {
        setForm({ ...form, courseId: e.target.value });
    };

    const submit = async () => {
        if (!form.courseId) {
            alert("Please select a course");
            return;
        }

        const payload = {
            questionText: form.questionText,
            options: form.options,
            correctAnswer: form.correctAnswer,
            courseId: form.courseId
        };

        await addQuestion(payload);
        alert("Question Added");

        setForm({
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            courseId: ""
        });
    };

    return (
        <div className="add-question-container">
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
                <h2 className="form-title">Add Question</h2>

                <div className="form-group">
                    <label className="form-label">Select Course</label>
                    <select value={form.courseId} onChange={handleCourseChange} className="form-select">
                        <option value="">-- Choose a Course --</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.courseName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Question</label>
                    <textarea
                        placeholder="Enter your question"
                        value={form.questionText}
                        onChange={(e) => setForm({ ...form, questionText: e.target.value })}
                        className="form-textarea"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Options</label>
                    <div className="options-container">
                        {form.options.map((opt, i) => (
                            <div key={i} className="option-input-wrapper">
                                <span className="option-number">{String.fromCharCode(65 + i)}</span>
                                <input
                                    placeholder={`Option ${i + 1}`}
                                    value={opt}
                                    onChange={(e) => updateOption(i, e.target.value)}
                                    className="form-input"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Correct Answer</label>
                    <input
                        placeholder="Enter the correct answer"
                        value={form.correctAnswer}
                        onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                        className="form-input"
                    />
                </div>

                <button onClick={submit} className="btn-submit">Save Question</button>
            </div>
        </div>
    );
}

export default AddQuestion;
