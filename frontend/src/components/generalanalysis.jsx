import React from "react";
import config from './../config.json';
import { useEffect, useState } from "react";
import {FormControl,
        MenuItem,
        Select} from "@mui/material";  
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function General() {

    const [subject, setSubject] = useState('');
    const [idlist, setIdList] = useState([]);
    const [marks, setMarks] = useState(null);

    const [data, setData] = useState(null);

    const subjectfunc = (e) => {
        setSubject(e.target.value);
        var currentSubject = e.target.value;

        const xlist = [];
        for (let i in idlist) {
            for (let j in marks) {
                if (marks[j][currentSubject].hasOwnProperty(idlist[i]['testid'])) {
                    xlist.push(idlist[i]['testid']);
                }}
        }
        const list = [...new Set(xlist)];

        const datasets = [];
        for (let classname in marks) {
            let data = [];
            for (let i in list) {
                if (marks[classname][currentSubject].hasOwnProperty(list[i])) {
                    data.push(marks[classname][currentSubject][list[i]]);
                } else {data.push(0)}
            }
            datasets.push({
                label: `Class ${classname}`,
                data: data,
                fill: false
              });
        }
        
        console.log(datasets);

        setData({labels:list, datasets:datasets});
    }

    useEffect(() => {
        fetch(`${config.serverUrl}/generalanalysis`, {
      method: "POST",
      headers:{  "Content-Type":"application/json" },
      })
      .then((res) => {return res.json();})
      .then((res) => {
        setMarks(res.res);
        setIdList(res.testid);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },[]);

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
        <>
            <div className="mt-3 p-3">
                <div className="container card bg-dark text-white text-center">
                    {subject 
                    ?
                    <h1>Average Marks in <i><b>{subject}</b></i> Subject</h1>
                    :
                    <h1>Please Select a Subject</h1>
                    }
                </div>
                <div className='p-3' style={{width:'200px'}}>
                    <FormControl fullWidth>
                        <Select
                            id="subjectname"
                            value={subject}
                            label="Age"
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
                <div style={{minHeight:'200px'}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Test Id</th>
                                {marks && Object.keys(marks).map((item) => (
                                    <th key={item}>Class {item.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {idlist.map((item) =>
                                <tr>
                                    {marks['a'][subject] && marks['a'][subject].hasOwnProperty(item.testid) ? (
                                        <>
                                        <td key={item.testid}>{item.testid}</td>
                                        {Object.keys(marks).map((item1) => (
                                            <th key={item1}>{marks[item1][`${subject}`][`${item.testid}`]}</th>
                                        ))}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="row mt-3 p-3 align-items-center">
                    <div className="card bg-dark text-white text-center col-sx col-md-2">
                        <h1>Time Trend</h1>
                    </div>
                    <div className="container col-sx col-md-10">
                        {data &&  <Line options={options} data={data}></Line>}
                    </div>
                </div>
            </div> 
        </>
    );
}