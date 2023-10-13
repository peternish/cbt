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

export default function StudentCourseDashboard() {

    const navigate = useNavigate();

    const onfunc_math = () => {
        navigate('/math');
    }
    
    const onfunc_eng = () => {
        navigate('/english');
    }
    
    const onfunc_his = () => {
        navigate('/history');
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
                    Course Dashboard
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Dear boys and girls. Here are 3 courses of Math, English and Nigerian History. Have Fun!
                </Typography>
            </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title='Mathematics'
                  subheader='Go Through The Course'
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
                  <Button fullWidth variant='contained' onClick={onfunc_math}>
                    Attend Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title='English'
                  subheader='Go Through The Course'
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
                  <Button fullWidth variant='contained' onClick={onfunc_eng}>
                    Attend Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title='Nigerian History'
                  subheader='Go Through the Course'
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
                  <Button fullWidth variant='contained' onClick={onfunc_his}>
                    Attend Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
        </Grid>
      </Container>
      </>
    )
}