function CourseCard({ course, onStart }) {
    return (
        <div className="card">
            <h3>{course.name}</h3>
            <button onClick={() => onStart(course.id)}>Start</button>
        </div>
    );
}

export default CourseCard;
