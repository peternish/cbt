import React, { useState } from "react";
import config from './../config.json';
import './register.css';
import { useNavigate } from "react-router-dom";

export default function Registert() {
    
    const [newUser, setNewUser] = useState({
        tname: '',
        tid: '',
        tphone: '',
        temail: '',
        tpassword: '',
        tpassword1: ''
    });

    const navigate = useNavigate();

    const onfunc = (e) => {
            e.preventDefault();
                console.log(newUser);
                if(newUser.tpassword===newUser.tpassword1)
                {
            fetch(`${config.serverUrl}/tregister`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newUser)
            })
              .then(res => res.json())
              .then(res => {
                if(res.resType === 0)
                {
                  alert("Teacher Already Exists");
                  navigate('/Logint');
                }
                else if(res.resType === 101)
                {
                  alert("PASSWORDS DON'T MATCH");
                }
                else
                {
                alert(`NEW TEACHER REGISTERED SUCCESFULLY!!`);
                navigate('/Logint');
                }
                console.log("done");
              });     
              }
              else
              {
                alert("Passwords Entered Do Not  Match");
              }
              
              }

    return (
          <div className="container1">
            <button id="bid1" onClick={() => navigate('/Registers')}><b>STUDENT</b></button>
            <button id="bid1" onClick={() => navigate('/Registert')}><b>TEACHER</b></button>
            <h1 style={{fontSize:"24"}}>TEACHER REGISTERATION</h1>
            <center><div className="g-signin2" data-onsuccess="onSignIn" style={{width:"300px"}}></div></center>
            <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
            <form onSubmit={onfunc}>
                <input type="text" name="tname" value={newUser.tname} placeholder="Enter your name" maxLength="20" onChange={e => {setNewUser({...newUser, tname:e.target.value});}} required/>
                <input type="text" name="tid" value={newUser.tid} placeholder="Enter your id" maxLength="20" onChange={e => {setNewUser({...newUser, tid:e.target.value});}} required/>
                <input type="email" name="temail" value={newUser.temail} id="temail" placeholder="Enter your email-id" onChange={e => {setNewUser({...newUser, temail:e.target.value});}} required/>
                <input type="tel" name="tphone" value={newUser.tphone} placeholder="Enter your contact-no" title="enter only numbers" onChange={e => {setNewUser({...newUser, tphone:e.target.value});}} required/>
                <input type="password" name="tpassword" value={newUser.tpassword} placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={e => {setNewUser({...newUser, tpassword:e.target.value});}} required/> 
                <input type="password" name="tpassword1" value={newUser.tpassword1} placeholder="Confirm your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={e => {setNewUser({...newUser, tpassword1:e.target.value});}} required/>
                <br/><br/>
                <center><button className="btn" style={{backgroundColor:"#1aa1d0",width:"200px",color:"white"}}>Submit</button></center>
            </form>
            <center className="mt-3"><button className="btn btn-outline-light" style={{textDecoration:"none",color:"black"}} onClick={() => navigate('/Logint')}>Already Registered...?click here to login.</button></center>
        <br/>
      </div>
    );


}
