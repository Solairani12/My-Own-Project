import axios from 'axios';
import { useEffect, useState } from "react";
import './Student.css';  // Import custom CSS file

function Student() {
    const [id, setId] = useState('');
    const [stname, setName] = useState("");
    const [course, setCourse] = useState("");
    const [fee, setFee] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        try {
            const result = await axios.get("http://localhost:8085/api/student/");
            setStudents(result.data.data);
            console.log(result.data);
        } catch (error) {
            console.error("Failed to load students:", error);
            alert("Error loading student data");
        }
    }

    async function save(event) {
        event.preventDefault();
        if (!stname || !course || !fee) {
            alert("All fields are required!");
            return;
        }
        try {
            await axios.post("http://localhost:8085/api/student/add", {
                stname,
                course,
                fee
            });
            alert("Student Registration Successfully");
            Load();
            clearForm();
        } catch (err) {
            console.error("User Registration Failed:", err);
            alert("User Registration Failed: " + (err.response?.data?.message || err.message));
        }
    }

    async function editStudent(student) {
        setName(student.stname);
        setCourse(student.course);
        setFee(student.fee);
        setId(student.id);
    }

    async function DeleteStudent(studentId) {
        try {
            await axios.delete(`http://localhost:8085/api/student/delete/${studentId}`);
            alert("Student deleted Successfully");
            Load();
        } catch (err) {
            console.error("Failed to delete student:", err);
            alert("Failed to delete student: " + (err.response?.data?.message || err.message));
        }
    }

    async function update(event) {
        event.preventDefault();
        if (!id || !stname || !course || !fee) {
            alert("All fields are required!");
            return;
        }
        try {
            await axios.put(`http://localhost:8085/api/student/update/${id}`, {
                stname,
                course,
                fee
            });
            alert("Registration Updated");
            Load();
            clearForm();
        } catch (err) {
            console.error("Registration Update Failed:", err);
            alert("Registration Update Failed: " + (err.response?.data?.message || err.message));
        }
    }

    const clearForm = () => {
        setId('');
        setName('');
        setCourse('');
        setFee('');
    };

    return (
        <div>
            
            <div className="container mt-4">
            <h3>STUDENT DETAILS</h3>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="student_id" hidden
                            value={id}
                            onChange={(event) => setId(event.target.value)}
                        />
                        <label>Student Name</label>
                        <input type="text" className="form-control small-input" id="name"
                            value={stname}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Course</label>
                        <input type="text" className="form-control small-input" id="course"
                            value={course}
                            onChange={(event) => setCourse(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fees</label>
                        <input type="text" className="form-control small-input" id="fee"
                            value={fee}
                            onChange={(event) => setFee(event.target.value)}
                        />
                    </div>

                    <div>
                        <button className="btn btn-primary mt-4" onClick={save}>Add Register</button>
                        <button className="btn btn-warning mt-4" onClick={update}>Update</button>
                    </div>
                </form>
               
            </div>
            
             
            <table className="table table-dark small-table" align="center">
                <thead>
                    <tr>
                        <th scope="col">Student Id</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Course</th>
                        <th scope="col">Fees</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <th scope="row">{student.id}</th>
                            <td>{student.stname}</td>
                            <td>{student.course}</td>
                            <td>{student.fee}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => editStudent(student)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            
        </div>
        
    );
}

export default Student;
