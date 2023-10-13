import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { FormControl, Select, MenuItem, InputLabel, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function StudentTestDashboard() {

    const navigate = useNavigate();

    const [testinfo, setTestInfo] = React.useState({
        testid: '',
        testname: ''
    })

    const func = () => {
        console.log(testinfo);
        if (testinfo.testid && testinfo.testname) {
            navigate(`/testlogin/?name=${testinfo.testname}&id=${testinfo.testid}`);
        }
        else {alert('Please fill all areas');}
    }

    return(
        <div className='container mt-3'>
            <div className='row p-3'>
                <div className='col-xs col-md-6'>
                    <Card>
                        <CardHeader
                        title='Attend Test'
                        subheader='See what you have learned'
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{
                            align: 'center',
                        }}
                        sx={{
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[700],
                        }}
                        />
                        <CardContent>
                            <Box>
                                <div className='row p-3'>
                                    <div className='col-6'>
                                        <center><p>Test Id:</p></center>
                                    </div>
                                    <div className='col-6'>
                                    <FormControl fullWidth>
                                        <Input id='testid' name='testid' value={testinfo.testid} onChange={e=>setTestInfo({...testinfo, testid:e.target.value})}/>
                                    </FormControl>
                                    </div>
                                </div>
                                <div className='row p-3'>
                                    <div className='col-6'>
                                        <center><p>Test Name:</p></center>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel>Select</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="testname"
                                                value={testinfo.testname}
                                                label="Age"
                                                onChange={e=>setTestInfo({...testinfo, testname:e.target.value})}
                                            >
                                                <MenuItem value={'Trial'}>Trial</MenuItem>
                                                <MenuItem value={'Trial1'}>Trial1</MenuItem>
                                                <MenuItem value={'Math'}>Math</MenuItem>
                                                <MenuItem value={'English'}>English</MenuItem>
                                                <MenuItem value={'History'}>History</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </Box>
                        </CardContent>
                        <center className='my-3'>
                                <Button variant='contained' onClick={func}>
                                    Attend the test
                                </Button>
                        </center>
                    </Card>
                </div>
                <div className='col-xs col-md-6'>
                    <img alt='studentdashboard-img' src='/stest.jpg' style={{width:'100%'}} />
                </div>
            </div>
        </div>
    )
}