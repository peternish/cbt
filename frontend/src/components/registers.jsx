import React, { useState } from "react";
import config from './../config.json';
import './register.css';
import { useNavigate } from "react-router-dom";

export default function Registers() {
    
    const [newUser, setNewUser] = useState({
        sname: '',
        srollno: '',
        sclass: '',
        spassword: '',
        spassword1: ''
    });

    const navigate = useNavigate();

    const onfunc = (e) => {
            e.preventDefault();
                console.log(newUser);
                if(newUser.spassword===newUser.spassword1)
                {
            fetch(`${config.serverUrl}/register`, {
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
                  alert("Student Already Exists");
                  navigate('/Logins');
                }
                else if(res.resType === 101)
                {
                  alert("PASSWORDS DON'T MATCH");
                }
                else
                {
                alert(`NEW STUDENT REGISTERED SUCCESFULLY!!`);
                navigate('/Logins');
                }
              });     
              }
              else
              {
                alert("Passwords Entered Do Not  Match");
              }
              
              }

    return (
      <>
        <div className="container1">
          <button id="bid1" onClick={() => navigate('/Registers')}><b>STUDENT</b></button>
          <button id="bid1" onClick={() => navigate('/Registert')}><b>TEACHER</b></button>
          <h1>STUDENT REGISTERATION</h1>
          <center><div className="g-signin2" data-onsuccess="onSignIn" style={{width:"300px"}}></div></center>
          <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
          <form onSubmit={onfunc}>
              <input type="text" name="sname" value={newUser.sname} placeholder="Enter your name"  maxLength="20" onChange={e => {setNewUser({...newUser, sname:e.target.value});}} required/>
              <input type="text" name="srollno" value={newUser.srollno} placeholder="Enter your roll number" maxLength="20" onChange={e => {setNewUser({...newUser, srollno:e.target.value});}} required/>
              <input type="text" name="sclass" value={newUser.sclass} id="sclass" placeholder="Enter your class" onChange={e => {setNewUser({...newUser, sclass:e.target.value});}} required/>
              <input type="password" name="spassword" value={newUser.spassword} placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={e => {setNewUser({...newUser, spassword:e.target.value});}}  required/> 
              <input type="password" name="spassword1" value={newUser.spassword1} placeholder="Confirm your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={e => {setNewUser({...newUser, spassword1:e.target.value});}} required/>
              <br/><br/>
              <center><button type="submit" className="btn" style={{backgroundColor:"#1aa1d0",width:"200px",color:"white"}}>Submit</button></center>
          </form>
          <center className="mt-3"><button className="btn btn-outline-light" style={{textDecoration:"none",color:"black"}} onClick={() => navigate('/Logins')}>Already Registered...?click here to login.</button></center>
          <br/>
          </div>
        </>
    );


}
