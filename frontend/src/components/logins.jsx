import React, { useState } from "react";
import config from './../config.json';
import t1 from '../images/student.svg';
import './login.css';
import { useNavigate } from "react-router-dom";

export default function Logins(props) {

    const [newUser, setNewUser] = useState({
        srollno: '',
        spassword: ''
    });

    const navigate = useNavigate();

    const onfunc1 = (e) => {
        e.preventDefault();
        console.log("user");
        console.log(newUser);
        fetch(`${config.serverUrl}/login`, {
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
                alert("Roll number and password does not match");
            }
            else if(res.code === 206)
            {
                alert("Roll number Not Registered");
                console.log('roll number nah');
                navigate('/Registers');
            }
            else
            {
                localStorage.setItem("jwt", JSON.stringify(res));
                props.loggedin(true);
                props.setStudent(true);
                navigate('/studentDashboard');
            }
          });
          }

    return (
        <div>
            <div className="row" style={{margin:0,padding:0}}>
                <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
                <img alt='student-login' src={t1} style={{width:"80%",marginTop:"8%"}}/>
                </div>

                <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
                    <div className="container5">
                        <button id="bid3" onClick={() => navigate('/Logins')}><b>LOGIN AS STUDENT</b></button>
                        <button id="bid3" onClick={() => navigate('/Logint')}><b>LOGIN AS TEACHER</b></button>
                        <h1>STUDENT LOGIN</h1>
                        <form onSubmit={onfunc1}>
                            <div className="row">
                                <div className="col">
                                    <input type="text" name="srollno" value={newUser.srollno} placeholder="Enter your roll number" onChange={e => setNewUser({...newUser, srollno:e.target.value})} required/>
                                    <input type="password" name="spassword" value={newUser.spassword} id="spass" placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={e => setNewUser({...newUser, spassword:e.target.value})} required/>
                                </div>
                            </div>
                            <br/>
                            <center><button className="btn btn-primary" type="submit" style={{width:'50%'}}>Sign In</button></center>
                        </form>
                        <center style={{marginTop: "20px",marginBottom:"10%"}}><button className="btn btn-outline-light" style={{textDecoration:"none",color:"black"}} onClick={() => navigate('/Registers')}>Not Registered Yet...?click here to register.</button></center>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}


