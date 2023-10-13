import { Container,
         Typography,
        Grid,
        Card,
        CardHeader,
        CardContent,
        CardActions,
        Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Analysis() {

    const navigate = useNavigate();

    const onfunc1 = () => {
      navigate('general');
    }

    const onfunc2 = () => {
      navigate('individual');
    }

    return (
        <>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Analysis Dashboard
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    See your students' capabilities and find proper solutions.
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
                        title='General Analysis'
                        subheader='Analyze by Classes'
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
                      <CardContent style={{minHeight:'100px'}}>
                        Here you can see each class's average marks, rating and time-trend.
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant='contained' onClick={onfunc1}>
                          Go
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
                        title='Target Analysis'
                        subheader='Analyze by Individual'
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
                      <CardContent style={{minHeight:'100px'}}>
                        Here you can see each student's average marks, rating and time-trend.
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant='contained' onClick={onfunc2}>
                          Go
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
              </Grid>
            </Container>
        </>
    );
}



export function Individual() {
    return(
        'dsfsdfsdfdsf'
    );
}