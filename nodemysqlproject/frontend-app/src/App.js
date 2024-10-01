import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Student from './Student/Student';
import Todo from'./Todolist/Todo';
import Add from './Add/add';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;