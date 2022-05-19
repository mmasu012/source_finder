
import Grid from '@mui/material/Grid';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {


    return (
        <div className='site-footer' style={{ backgroundColor: '#003da5', marginTop: '20px', paddingTop: '40px' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <div style={{textAlign:'center'}}>
                        <Link to="/sourcefinder"><Nav.Link href="/sourcefinder" style={{color: "white", fontWeight: 'bold' }}>Home</Nav.Link></Link>
                    </div>
                    <div style={{textAlign:'center', marginTop: '10px'}}>
                        <Link to="/database"><Nav.Link href="/sourcefinder" style={{color: "white", fontWeight: 'bold' }}>Database</Nav.Link></Link>
                    </div>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <div style={{textAlign:'center'}}>
                        <Typography  variant="subtitle1"  align='justify'>
                            <Box sx={{ color: 'white', fontWeight: 'bold', m: 1, fontFamily: 'Helvetica' }}>
                                {"Contact information: mroko001@ucr.edu"}
                            </Box>
                        </Typography>
                    </div>
                </Grid>
                
            </Grid>
        </div>
    );
};




