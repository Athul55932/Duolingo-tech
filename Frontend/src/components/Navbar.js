import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h3>TechDuolingo</h3>
            <div>
                <Link to="/courses">Courses</Link>{" | "}
                <Link to="/admin/add-course">Add Course</Link>{" | "}
                <Link to="/admin/add-question">Add Question</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        background: "#4CAF50",
        color: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
    },
};

export default Navbar;
