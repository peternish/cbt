import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {

    const navigate = useNavigate();

    const onfunc1 = () => {
      navigate('/analysis');
    }

    const onfunc2 = () => {
      navigate('/testdatainsert');
    }

    return(
        <>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Teacher Dashboard
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Here, you can hold a test or see the previous exam results of the students.
                </Typography>
            </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
            <Grid
              item
              xs={12}
              md={6}
            >
              <Card>
                <CardHeader
                  title='Test Analysis'
                  subheader='Analyzing Student Performance in Assessments'
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
                    Explore your students' marks
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant='contained' onClick={onfunc1}>
                    Go to the analysis dashboard
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <Card>
                <CardHeader
                  title='Organize an Exam'
                  subheader='Invite your Students to Test'
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
                    Let your students sit your exam
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant='contained' onClick={onfunc2}>
                    Organize an exam
                  </Button>
                </CardActions>
              </Card>
            </Grid>
        </Grid>
      </Container>
      </>
    )
}