import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {

    const navigate = useNavigate();

    const onfunc1 = () => {
        navigate('/course');
    }
    const onfunc2 = () => {
        navigate('/studenttestDashboard');
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
                    Student Dashboard
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Dear boys and girls. Now go through some courses or attend simple exams to see what you know.
                </Typography>
            </Container>

            <Container maxWidth="md" component="main">
              <Grid container spacing={5} alignItems="flex-end">
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Card>
                      <CardHeader
                        title='Helpful Course'
                        subheader='Go Through Courses'
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
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant='contained' onClick={onfunc1}>
                          Attend Courses
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
                        title='Attend a Test'
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
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant='contained' onClick={onfunc2}>
                          Attend a test
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
              </Grid>
            </Container>
        </>
    )
}