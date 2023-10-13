import React, { useState } from "react";
import config from './../config.json';
import t1 from '../images/teacher.svg';
import './login.css';
import { useNavigate } from "react-router-dom";

export default function Logint(props) {

    const [newUser, setNewUser] = useState({
        tid: '',
        tpassword: ''
    })

    const navigate = useNavigate();

    const onfunc1 = (e) => {
        e.preventDefault();
        console.log(newUser);
        fetch(`${config.serverUrl}/tlogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        })
          .then(res => res.json())
          .then(res => {
            if(res.code === 204)
            {
                alert("Your id and password does not match");
            }
            else if(res.code === 206)
            {
                alert("Your Id Not Registered");
                navigate('/Registert');
            }
            else
            {   
                localStorage.setItem("jwt", JSON.stringify(res));
                props.loggedin(true);
                props.setTeacher(true);
                navigate('/teacherDashboard');
            }
          });
          }

    return (
        <div>
            <div className="row" style={{margin:0,padding:0}}>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <img src={t1} alt="teacher-login" style={{width:"80%",marginTop:"15%"}}/>
            </div>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <div className="container5">
            <button id="bid3" onClick={() => navigate('/Logins')}><b>LOGIN AS STUDENT</b></button>
            <button id="bid3" onClick={() => navigate('/Logint')}><b>LOGIN AS TEACHER</b></button>
            <h1>TEACHER LOGIN</h1>

        <form onSubmit={onfunc1}>
           <div className="row">
           <div className="col">
           <input type="text" name="tid" value={newUser.tid} placeholder="Enter your id" onChange={e => setNewUser({...newUser, tid: e.target.value})} required/>
            <input type="password" name="tpassword" value={newUser.tpassword} id="spass" placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={e => setNewUser({...newUser, tpassword: e.target.value})} required/> 
           </div>
           </div>
            <br/>
            <center><button className="btn btn-primary" type="submit" style={{width:'50%'}}>Sign In</button></center>
        </form>
        <center style={{marginTop: "20px"}}><button className="btn btn-outline-light" style={{textDecoration:"none",color:"black"}} onClick={() => navigate('/Registert')}>Not Registered Yet...?click here to register.</button></center>
        <br/>
        </div>
            </div>
            </div>
            <br/><br/><br/>
        </div>
    )
}