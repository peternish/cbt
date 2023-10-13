import React, { useState } from "react";
import config from './../config.json';
import sampleexcel from './samplefile.xlsx';
import XLSX from 'xlsx';
import CopyToClipboard from "react-copy-to-clipboard";

export default function TestDataInsert() {

  const [newTest, setNewTest] = useState({
    arr: [],
    testid: "",
    testname: "",
    flag: false,
    teacherid: "",
    link: "",
    file: {},
    cols: [],
    isEmpty: true
  })

  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [r, setR] = useState("");

  const make_cols = (refstr) => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
    return o;
  }

  const handleFile = (e) => {
    const files = e.target.files;
    if (files && files[0]) setNewTest({...newTest, file: files[0] });
  }

  const f1 = () => {
    try {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? 'binary' : 'array',
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        const list = data.map(obj => {
          return Object.values(obj);
        });
        /* Update state */
        setNewTest({
          ...newTest,
          arr: list,
          cols: make_cols(ws['!ref']),
          isEmpty: false,
        });
      };

      if (rABS) {
        reader.readAsBinaryString(newTest.file);
      } else {
        reader.readAsArrayBuffer(newTest.file);
        console.log(newTest);
      }
    } catch (e) {
      console.log('Empty!');
    }
  }

  const add=()=>{
    console.log(q,a,b,c,d,r);
    if(q && a && b &&c && d && r)
    {
        setNewTest({
          ...newTest,
          arr: [...newTest.arr, [q, a, b, c, d, r]]
        })
        alert("added");
        setQ("");
        setA("");
        setB("");
        setC("");
        setD("");
        setR("");
    }
    else{
        alert("fill all data");
    }
  }

  const submit=()=>{
    console.log(newTest.arr);
    if (newTest.flag===true){
      fetch(`${config.serverUrl}/handleFile?tid=${JSON.parse(localStorage.getItem("jwt")).user.id}`,{
          method:"POST",
          headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            },
          body:JSON.stringify(newTest.arr)
      })
      .then(res=>res.json())
      .then(res => {
        setNewTest({...newTest, link:res.ln, flag:false});
      });
      document.getElementById('open-submitmodal').click();
    }
    else {
      alert('Please check your testid and testname.')
    }
  }

  const setFlag=()=>{
    if (newTest.testid && newTest.testname){
     var obj={testid:newTest.testid,testname:newTest.testname};
     console.log(newTest.testid+" "+newTest.testname);
     fetch(`${config.serverUrl}/testid`,{
      method:"POST",
      headers:{
       Accept: "application/json",
         "Content-Type":"application/json",
         },
      body:JSON.stringify(obj)
   })
   .then(res => res.json())
      .then(res => {
        if(res.resType === 1)
        {
          setNewTest({...newTest, flag:true})
          alert('These id and name are available.');
          document.getElementById('examplemodal-close').click();
        }
        else 
        {
          console.log(res.resType);
          alert("Please enter another key.This key already exists!!!");
        }
   });}
   else alert('Please fill all areas.');
  }

  return(
    <div className="container p-3">
      <div className="row">
        <div className="col">


          <div className="card shadow mb-3">

            <div className="card-header py-3">
              <div className="row">
                <div className="col-6">
                  <p className="text-primary m-0 font-weight-bold">Test ID : {newTest.testid} </p>
                  <p className="text-primary m-0 font-weight-bold">Test Name : {newTest.testname}</p>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-outline-primary" id="onmodal" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{float:"right"}}>
                    Enter Test ID and Test Name
                  </button>
                </div>
              </div>
                <div style={{float:"right"}} >
                  <button className = "btn btn-outline-primary btn-icon-split m-2" data-bs-toggle="modal" data-bs-target="#testModal">
                    <span className = "icon">
                      <i className="fa fa-upload"></i>
                    </span>
                    <span className = "text">Upload Excel Sheet</span>
                  </button>
                  <a className = "btn btn-outline-success btn-icon-split ml-3" href={sampleexcel} download>
                    <span className = "icon">
                      <i className="fa fa-download"></i>
                    </span>
                    <span className = "text">Download Sample Sheet</span>
                  </a>
                </div>
            </div>

            <div className="card-body">
                <h3>Upload question</h3>
                <div>
                    <div className="form-row row">
                        <div className="col-xs col-md-8">
                            <div className="form-group"><label ><strong>Question</strong></label><input type="text" className="form-control" id="ques" placeholder="Question" name="Question" value={q} onChange={e => setQ(e.target.value)} /></div>
                        </div>
                        <div className="col-xs col-md-4">
                            <div className="form-group"><label><strong>Answer</strong></label><input type="text" className="form-control" id="op_correct" placeholder="Correct Answer" name="Correct Answer" value={r} onChange={e => setR(e.target.value)} /></div>
                        </div>
                    </div>

                    <div className="form-row row mt-2">
                      <div className="col-xs col-md-3">
                        <div className="form-group"><label ><strong>Option A</strong></label><input type="text" className="form-control" id="op1" placeholder="Option 1" name="Option1" value={a} onChange={e => setA(e.target.value)} /></div>
                      </div>
                      <div className="col-xs col-md-3">
                          <div className="form-group"><label ><strong>Option B</strong></label><input type="text" className="form-control"  id="op2" placeholder="Option 2" name="Option2" value={b} onChange={e => setB(e.target.value)} /></div>
                      </div>
                      <div className="col-xs col-md-3">
                          <div className="form-group"><label ><strong>Option C</strong></label><input type="text" className="form-control"  id="op3" placeholder="Option 3" name="Option2" value={c} onChange={e => setC(e.target.value)} /></div>
                      </div>
                      <div className="col-xs col-md-3">
                          <div className="form-group"><label ><strong>Option D</strong></label><input type="text" className="form-control"  id="op4" placeholder="Option 4" name="Option2" value={d} onChange={e => setD(e.target.value)} /></div>
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <button className="btn btn-outline-danger btn-icon-split m-2" onClick={add} style={{minWidth:'200px'}}><span className="icon"><i className="fa fa-plus"></i></span><span className="text">Add</span></button>
                      <button className="btn btn-outline-primary btn-icon-split" onClick={submit} style={{minWidth:'200px'}}><span className="icon"><i className="fa fa-upload"></i></span><span className="text">Submit</span></button>
                      <button  id='open-submitmodal'  data-bs-toggle="modal" data-bs-target="#submitModal" style={{display:'none'}}>open submitmodal</button>
                    </div>
                </div>
            </div>
          
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Uploaded Questions</p>
        </div>
        <div className="card-body">
            <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                <table className="table dataTable my-0" id="dataTable">
                    <thead>
                        <tr>
                            <th style={{width: "5%"}}>Problem.no</th>
                            <th style={{width: "20%"}}>Questions</th>
                            <th style={{width: "15%"}}>Option A</th>
                            <th style={{width: "15%"}}>Option B</th>
                            <th style={{width: "15%"}}>Option C</th>
                            <th style={{width: "15%"}}>Option D</th>
                            <th style={{width: "15%"}}>Correct</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newTest.arr && newTest.arr.map((data,index) =>
                        <tr key={index} id={'tdcol'+index}>
                        <td>{index+1}</td>
                        <td>{data[0]}</td>
                        <td>{data[1]}</td>
                        <td>{data[2]}</td>
                        <td>{data[3]}</td>
                        <td>{data[4]}</td>
                        <td>{data[5]}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog" role="document" id="modalchange" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Test Details</h5>
              <button className="btn btn-close" data-bs-dismiss="modal" id="examplemodal-close" aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              <div className="p-3">
                <input type="text" className="form-control" id="testid" value={newTest.testid} placeholder="Enter Test Id" onChange={e => setNewTest({...newTest, testid:e.target.value})} required/>
              </div>
              <div className="p-3">
                <input type="text" className="form-control" id="testname" value={newTest.testname} placeholder="Enter Test Name" onChange={e => setNewTest({...newTest, testname:e.target.value})} required/>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-primary" onClick={setFlag}>Next</button>
            </div>
          </div>
        </div>
      </div>

      <div className = "modal fade " id="testModal">
        <div className = "modal-dialog" role="document">
          <div className = "modal-content">
            <div className = "modal-header bg-info">
              <h5 className = "modal-title text-gray-800" id="exampleModalLabel">UPLOAD EXCEL SHEET</h5>
              <button className="btn btn-close" id="testmodal-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className = "modal-body">
              <div className = "input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  accept=".xlsx"
                  onChange={handleFile}
                />
              </div>
            </div>  
            <div className = "modal-footer">
              <button className="btn btn-primary" onClick={f1}>UPLOAD</button>
              
              <button className = "btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
            </div>                        
          </div>
        </div>
      </div>

      <div className = "modal fade " id="submitModal">
        <div className = "modal-dialog" role="document">
          <div className = "modal-content">
            <div className = "modal-header bg-info">
              <h5 className = "modal-title text-gray-800" id="exampleModalLabel">Test uploaded Successfully!!</h5>
              <button className = "btn btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className = "modal-body">
                <div className = "input-group mb-3">
                  <p className="text text-gray-800">Copy the link..</p>
                  <input value={newTest.link} style={{width:'100%'}} disabled/>
                </div>
            </div>
            <div className = "modal-footer">
              <CopyToClipboard text={newTest.link}>
                <button className="btn btn-outline-primary">Copy to clipboard</button>
              </CopyToClipboard>
              <button className = "btn btn-dark" data-bs-dismiss='modal'>CLose</button>
            </div>
          </div>
        </div>
      </div>
    </div> 

)
    
}