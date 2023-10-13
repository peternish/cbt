import {Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';

import Registers from './components/registers';
import Registert from './components/registert';
import Logins from './components/logins';
import Logint from './components/logint';

import TeacherDashboard from './components/tdashboard';
import TestDataInsert from './components/testdatainsert';

import StudentTestDashboard from './components/stestdashboard';
import Testlogin from './components/testlogin';
import Mcq from './components/mcq';
import StudentDashboard from './components/sdashboard';
import StudentCourseDashboard from './components/scoursedashboard';
import Math from './components/math';
import English from './components/english';
import History from './components/history';
import Analysis from './components/analysis';
import General from './components/generalanalysis';
import Individual from './components/individualanalysis';

function App() {

  const [loggedin, setLoggedin] = useState(false);
  const [isteacher, setIsTeacher] = useState(false);
  const [isstudent, setIsStudent] = useState(false);

  const usertype = localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem('jwt')).user.type : '';
  const username = localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem('jwt')).user.name : '';

  const pdf = './test.pdf';

  return (
    <div>
      <Navbar username = {username} loggedin={st=>setLoggedin(st)} logstate={loggedin} setStudent = {st => setIsStudent(st)} setTeacher = {st => setIsTeacher(st)} />
      <Routes>
        
        <Route exact path='/' element={<Home />}></Route>

        <Route path='/Registers' element={<Registers />}></Route>
        <Route path='/Registert' element={<Registert />}></Route>
        <Route path='/Logins' element={<Logins loggedin = {st=>setLoggedin(st)} setStudent = {st => setIsStudent(st)} />}></Route>
        <Route path='/Logint' element={<Logint loggedin = {st=>setLoggedin(st)} setTeacher = {st => setIsTeacher(st)} />}></Route>

        <Route path='/teacherDashboard' element={isteacher===true || usertype==='teacher'?<TeacherDashboard />:<Navigate to='/Logint' /> }></Route>
        <Route path='/testdatainsert' element={isteacher===true || usertype==='teacher'?<TestDataInsert />:<Navigate to='/Logint' />}></Route>
        <Route path='/analysis' element={isteacher===true || usertype==='teacher'?<Analysis />:<Navigate to='/Logint' />}></Route>
        <Route path='/analysis/general' element={isteacher===true || usertype==='teacher'?<General />:<Navigate to='/Logint' />}></Route>
        <Route path='/analysis/individual' element={isteacher===true || usertype==='teacher'?<Individual />:<Navigate to='/Logint' />}></Route>

        
        <Route path='/studentDashboard' element={isstudent===true || usertype==='student'?<StudentDashboard />:<Navigate to='/Logins' />}></Route>

        <Route path='/studenttestDashboard' element={isstudent===true || usertype==='student'?<StudentTestDashboard />:<Navigate to='/Logins' />}></Route>
        <Route path='/testlogin' element={isstudent===true || usertype==='student'?<Testlogin />:<Navigate to='/Logins' />}></Route>
        <Route path='/mcq' element={isstudent===true || usertype==='student'?<Mcq />:<Navigate to='/Logins' />}></Route>
        
        <Route path='/course' element={isstudent===true || usertype==='student'?<StudentCourseDashboard />:<Navigate to='/Logins' />}></Route>
        <Route path='/math' element={isstudent===true || usertype==='student'?<Math pdf = {pdf} />:<Navigate to='/Logins' />}></Route>
        <Route path='/english' element={isstudent===true || usertype==='student'?<English pdf = {pdf} />:<Navigate to='/Logins' />}></Route>
        <Route path='/history' element={isstudent===true || usertype==='student'?<History pdf = {pdf} />:<Navigate to='/Logins' />}></Route>
      </Routes>
    </div>
  );
}

export default App;
