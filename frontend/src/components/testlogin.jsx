import React, { useEffect, useState } from "react";
import img from '../images/test1.svg';
import { Link } from "react-router-dom";

export default function Testlogin() {

    const [testinfo, setTestInfo] = useState({
        testid: '',
        testname: ''
    });

    useEffect(() => {
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        setTestInfo({
            ...testinfo,
            testid:params.get('id'),
            testname:params.get('name')
        });
    },[])

    return(
        <div>
            <div className="container5" style={{width:"60%",marginTop:"5%"}}>
                <div className="row">
                    <div className="col-12">
                        <img alt="test-login-img" src={img} style={{height:"100%",width:"100%"}}/>
                    </div> 
                </div>
                <div className="row">
                    <div className="col-12">
                        <br/><br/>
                        <center><h3>Test Name : {testinfo.testname}</h3></center>
                        <center><h3>Test Id : {testinfo.testid}</h3></center>
                    </div>                      
                </div><br/>
                <div className="row">
                    <div className="col-12">
                        <center>
                            <Link to={`/mcq?name=${testinfo.testname}&id=${testinfo.testid}`}><button id="button2"   style={{marginLeft:"3%"}}>Continue</button></Link>
                        </center>
                    </div>
                </div><br/>
            </div>
            <br/><br/>
        </div>
    )
}
