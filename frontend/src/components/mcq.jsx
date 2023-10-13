import React, { useEffect, useState } from "react";
import config from './../config.json';
import { useNavigate } from "react-router-dom";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup} from "@mui/material";
    import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


export default function Mcq() {

  const navigate = useNavigate();
  const [test, setTest] = useState([]);
  const [submitarr, setSubmitArr] = useState({});
  const [mark, setMark] = useState();
  const [result_sentence, setResultSentence] = useState('');

  const url = new URL(window.location.href); 
  const params = new URLSearchParams(url.search);

  const testid = params.get('id');
  const testname = params.get('name');

  useEffect(() => {

      fetch(` ${config.serverUrl}/mcq?testname=${params.get('name')}&testid=${params.get('id')}`, {
      method: "GET",
      headers:{  "Content-Type":"application/json" },
      })

      .then(res => {return res.json();})
      .then(res => {
      console.log(res);
      var temp=[];
      var submit = [];
      
      res.map((r)=>{
        var obj={ques:"", choices:[], problem_id:''}
            obj.ques=r.question;
            obj.choices.push(r.option1);
            obj.choices.push(r.option2);
            obj.choices.push(r.option3);
            obj.choices.push(r.option4);
            obj.problem_id=r.sno;
            temp.push(obj);
            submit.push(0);
      })
      setTest(temp);
      setSubmitArr(submit);
      })
  },[])

  useEffect(() => {
    console.log(submitarr[1]);
  }, [submitarr]);

  const submit = () => {
    var test={
      ans: JSON.stringify(submitarr),
      testid:params.get('id'),
      srollno:JSON.parse(localStorage.getItem("jwt")).user.id
    }
    var username = JSON.parse(localStorage.getItem("jwt")).user.name;
    fetch(`${config.serverUrl}/submitans`,{
      method:"POST",
            headers:{
             Accept: "application/json",
               "Content-Type":"application/json",
               },
            body:JSON.stringify(test)
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.resType === 0)
        {
          alert('Sorry, the test is ended.');
          navigate("/");
        }
      else {
        setMark(res.mark);
        if (Number(res.mark) >= 9.0) {
          console.log('great');
          setResultSentence(`Great, ${username}!`);
        }
        else {setResultSentence('Ooops!')};
        document.getElementById('open-resultModal').click();
      }
    })
  }

  return (
    <div className="container my-3">
      <div className="card text-center my-3">
        <h3>Test Id: <i>{testid}</i></h3>
        <h3>Subject: <i>{testname}</i></h3>
      </div>
      {test.map((item, index) => (
        <div key={index} className="pt-3">
          <Accordion sx={{bgcolor:'#e3f2fd'}}>

            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`panelheader-${index}`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Problem No {item['problem_id']}
              </Typography>
              <Typography sx={{ width: '60%', flexShrink: 0 }}>{item['ques']}</Typography>
              
              <DoneOutlineIcon sx={{display: submitarr[index] === 0 ? 'none' : 'block' }} />
            </AccordionSummary>

            <AccordionDetails>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Select One of Them</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={item['choices'][0]}
                  name="radio-buttons-group"
                  id={index}
                  onChange={e => setSubmitArr({...submitarr, [JSON.parse(index)]: e.target.value})}
                >
                  <FormControlLabel value='1' control={<Radio />} label={item['choices'][0]} />
                  <FormControlLabel value='2' control={<Radio />} label={item['choices'][1]} />
                  <FormControlLabel value='3' control={<Radio />} label={item['choices'][2]} />
                  <FormControlLabel value='4' control={<Radio />} label={item['choices'][3]} />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-outline-dark" data-bs-toggle='modal' data-bs-target='#endModal'>End Test</button>
      </div>

      <div className="modal fade " id="endModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title text-gray-800" id="exampleModalLabel">Do you really want to finish the test?</h5>
              <button className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Select "Yes" below if you are ready to end your test.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-primary" data-bs-dismiss='modal' onClick={submit}>Yes</button>
            </div>
          </div>
        </div>
      </div>
      
      <button id="open-resultModal" data-bs-toggle='modal' data-bs-target='#resultModal' style={{display: 'none'}}></button>

      <div className="modal fade " id="resultModal" tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title text-gray-800">Result</h5>
              <button className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{result_sentence} Your mark is {mark}.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
