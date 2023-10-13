import React from "react";
import Link from '@mui/material/Link' ;
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import './home.css'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    return (
            <div className="m-3 p-3">
                <h2 id="head1">Iris Computer Based Test System</h2>

                <Grid2 container>
                    <Grid2 xs={12} md={3}>
                    <>
                    <br/>
                        <h1 id="head3">For Students</h1>
                        <p id="p1">Welcome to Iris! Get ready to learn and have fun!</p><br/>
                        <Link style={{marginLeft:"40px"}}><Button onClick={() => navigate('/Registers')} id="button1">Sign Up</Button></Link>
                    </>
                    </Grid2>
                    <Grid2 xs={12} md={3}>
                    <>
                        <br/>
                        <h1 id="head2" style={{marginLeft:"40px"}}>For Teachers</h1>
                        <p style={{marginLeft:"40px"}}>Monitor your students' progress and identify areas where they need additional support.</p>
                        <Link style={{marginLeft:"40px"}}><Button onClick={() => navigate('/Registert')} id="button2">Sign Up</Button></Link>
                    </>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                        <img alt="homeimg" id="mimg" src='./img_vowel.jpg'/>

                    </Grid2>
                </Grid2>
            </div>
        )
        }