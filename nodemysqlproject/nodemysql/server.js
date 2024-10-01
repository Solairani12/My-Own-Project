const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const server = express();
server.use(bodyParser.json());
server.use(cors());

// Establish the database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234567",
    database: "dbstdnt",
});

db.connect((error) => {
    if (error) {
        console.log("Error Connecting to DB:", error.message);
    } else {
        console.log("Successfully Connected to DB");
    }
});

// Establish the Port
server.listen(8085, (error) => {
    if (error) {
        console.log("Error Starting Server:", error.message);
    } else {
        console.log("Server Started on Port 8085");
    }
});

// Create the Records
server.post("/api/student/add", (req, res) => {
    const details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };

    const sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            return res.status(500).send({ status: false, message: "Student creation failed", error: error.message });
        }
        res.send({ status: true, message: "Student created successfully" });
    });
});

// View the Records
server.get("/api/student", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, message: "Failed to retrieve students", error: error.message });
        }
        res.send({ status: true, data: result });
    });
});

// Search the Records
server.get("/api/student/:id", (req, res) => {
    const studentid = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    db.query(sql, [studentid], (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, message: "Failed to retrieve student", error: error.message });
        }
        if (result.length === 0) {
            return res.status(404).send({ status: false, message: "Student not found" });
        }
        res.send({ status: true, data: result });
    });
});

// Update the Records
server.put("/api/student/update/:id", (req, res) => {
    const sql = "UPDATE student SET stname = ?, course = ?, fee = ? WHERE id = ?";
    const data = [req.body.stname, req.body.course, req.body.fee, req.params.id];

    db.query(sql, data, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, message: "Student update failed", error: error.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ status: false, message: "Student not found" });
        }
        res.send({ status: true, message: "Student updated successfully" });
    });
});

// Delete the Records
server.delete("/api/student/delete/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";
    db.query(sql, [req.params.id], (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, message: "Failed to delete student", error: error.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ status: false, message: "Student not found" });
        }
        res.send({ status: true, message: "Student deleted successfully" });
    });
});
