function QuestionCard({ question }) {
    return (
        <div className="card">
            <p><b>{question.questionText}</b></p>
            {question.options.map((opt) => (
                <p key={opt}>• {opt}</p>
            ))}
            <p><b>Answer:</b> {question.correctAnswer}</p>
        </div>
    );
}

export default QuestionCard;
