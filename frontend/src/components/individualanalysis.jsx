import React, { useState } from "react";
import config from './../config.json';

import {FormControl,
    MenuItem,
    Select,
    Box} from "@mui/material";

import 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

export default function Individual() {

    const [classname, setClassName] = useState();
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState('');
    const [subject, setSubject] = useState('');

    const [marks, setMarks] = useState([]);
    const [tests, setTests] = useState([]);

    const [target, setTarget] = useState({});

    // fetch student list according to classname
    const classfunc = (e) => {
        setClassName(e.target.value);
        var classname = e.target.value;
        fetch(` ${config.serverUrl}/selectstudent`, {
        method: "POST",
        headers:{  "Content-Type":"application/json" },
        body: JSON.stringify({classname:classname})
        })
        .then((res) => {return res.json();})
        .then((res) => {
            const studentlist = [];
            for (let i in res) {
                studentlist.push(res[i]['sname']);
            }
            setStudents(studentlist);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // fetch an individual's overall exam result
    const studentfunc = (e) => {
        setStudent(e.target.value);
        var student = e.target.value;
        fetch(` ${config.serverUrl}/individualanalysis`, {
            method: "POST",
            headers:{  "Content-Type":"application/json" },
            body: JSON.stringify({student:student})
        })
        .then((res) => {return res.json();})
        .then((res) => {
            setMarks(res.marks);
            setTests(res.tests);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // filter an individual's exam result by the chosen subject
    const subjectfunc = (e) => {
        setSubject(e.target.value);
        var subject = e.target.value;
        const testids = [];
        for (let i in tests) {
            if (tests[i]['testname'] === subject) {
                testids.push(tests[i]['testid'])
            }
        }
        const testmarks = [];
        for (let j in testids) {
            var filtered = marks.filter(obj => obj.testid === testids[j]);
            if (filtered[0]) {
                testmarks.push(filtered[0]['mark']);
            } else {
                testmarks.push(null);
            }
        }
        
        console.log(testids);
        console.log(testmarks);

        setTarget({testids:testids, testmarks:testmarks});
    }
    // chart option
    const options = {
        scales: {
            y: {
                max: 10,
                min: 0,
                ticks: {
                    stepSize: 0.5
                }
            }
        }
    };

    return(
        <div>
            <div className="mt-3 p-3 row">

                {/* sidebar start - where exact student is selected */}
                <div className="col-sx col-md-2" style={{minHeight:'100rh'}}>
                     {/* select class */}
                    <div className='p-3'>
                        <Box>Class</Box>
                        <FormControl fullWidth>
                            <Select
                                id="classname"
                                value={classname}
                                onChange={e=>classfunc(e)}
                            >
                                <MenuItem value='a'>Class A</MenuItem>
                                <MenuItem value='b'>Class B</MenuItem>
                                <MenuItem value='c'>Class C</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* select individual */}
                    <div className='p-3'>
                        <Box>Student</Box>
                        <FormControl fullWidth>
                            <Select
                                id="studentname"
                                value={student}
                                onChange={e=>studentfunc(e)}
                            >
                                {students.map(student => (
                                    <MenuItem value={student}>{student}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {/* select subject */}
                    <div className='p-3'>
                        <Box>Subject</Box>
                        <FormControl fullWidth>
                            <Select
                                id="subjectname"
                                value={subject}
                                onChange={e=>subjectfunc(e)}
                            >
                                <MenuItem value='Trial'>Trial</MenuItem>
                                <MenuItem value='Trial1'>Trial1</MenuItem>
                                <MenuItem value='Math'>Math</MenuItem>
                                <MenuItem value='English'>English</MenuItem>
                                <MenuItem value='History'>History</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* sidebar end */}

                {/* analysis panel start */}
                <div className="col-sx col-md-10">
                    <div className="container card bg-dark text-white text-center">
                        {student && subject ? 
                        <h2>Student <i><b>{student}</b></i>'s Overall Performance In Subject <i><b>{subject}</b></i></h2>
                        :
                        <h2>Please Select Student Name and Subject</h2>}
                    </div>
                    {/* start : table of marks */}
                    <div className="mt-3" style={{minHeight:'20vh'}}>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    {target.testids && target.testids.map((item) => (
                                        <th key={item}>{item}</th>
                                    ))}
                                </tr>
                                <tr>
                                    {target.testmarks && target.testmarks.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* end : table of marks */}
                    
                    {/* start : chart section */}
                    <div>
                        {target.testmarks &&
                            <div className="container card bg-dark text-white text-center">
                                <h2>Time Trend</h2>
                            </div>
                        }
                        {
                            target.testids && target.testmarks &&
                            target &&
                            <>
                            <Line options={options} data = {{labels:target.testids, datasets:[{
                                                                            label: subject,
                                                                            data: target.testmarks,
                                                                            fill: false}]}}
                            ></Line>
                            <Bar options={options} data = {{labels:target.testids, datasets:[{
                                label: subject,
                                data: target.testmarks,
                                fill: false}]}}
                            ></Bar>
                            </>
                        }
                    </div>
                    {/* end : chart section */}
                </div>
                {/* analysis panel end */}

            </div>
        </div>
    );
}