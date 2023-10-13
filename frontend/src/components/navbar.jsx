import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {

    const navigate = useNavigate();

    const logoutfun=()=>{
        localStorage.removeItem('jwt');
        props.loggedin(false);
        props.setTeacher(false);
        props.setStudent(false);
        navigate('/');
    }

  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          mt: 1,
          flexGrow: 1,
        },
      }}
      className = 'p-3 bg-dark'
    > <Grid2 container>
        <Grid2  xs={3} md={4} >
            <Link onClick={() => navigate('/')}>
                <Button>ICBT</Button>
            </Link>
            <Link onClick={() => navigate('/analysis')}>
                <Button>Analysis</Button>
            </Link>
            <Link>
                <Button onClick={() => navigate('/testdatainsert')}>Upload Test</Button>
            </Link>
        </Grid2>
        <Grid2  xs={6} md={6} className='px-3'>
            <Link onClick={() => navigate('/')}>
                <Button>Home</Button>
            </Link>
            <Link onClick={() => navigate('/studenttestDashboard')}>
                <Button>Sit a Test</Button>
            </Link>
            <Link onClick={() => navigate('/course')}>
                <Button>Attend a Course</Button>
            </Link>
        </Grid2>
        <Grid2  xs={3} md={2}>
            {props.logstate === true || localStorage.getItem('jwt')
            ?
            <>
                <Link onClick = {logoutfun}>
                    <Button>Log out</Button>
                </Link>
                <Button style={{color:'white'}}>Welcome {props.username}</Button>
            </>
            :
            <>
                <Link onClick={() => navigate('/Logins')}>
                    <Button>Log in</Button>
                </Link>
                <Link onClick={() => navigate('/Registers')}>
                    <Button>Register</Button>
                </Link>
            </>
            }
        </Grid2>
      </Grid2>
    </Box>

  );
}