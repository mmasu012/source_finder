
import Grid from '@mui/material/Grid';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';


export default function Footer() {


    return (
        <div className='site-footer' style={{ backgroundColor: '#ffb81c', marginTop: '20px', paddingTop: '40px' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <div style={{textAlign:'center'}}>
                        <Link to="/home"><Nav.Link href="/home" style={{color: "#003da5" }}>Home</Nav.Link></Link>
                    </div>
                </Grid>
                {/* <Grid item xs={4}>
                    <div style={{textAlign:'center'}}>
                        <Link to="/home"><Nav.Link href="" style={{color: "#003da5" }}>Developers</Nav.Link></Link>
                    </div>
                </Grid> */}
                <Grid item xs={4}>
                    <div style={{textAlign:'center', color: "#003da5"}}>
                        Contact us
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{textAlign:'center'}}>
                        <Link to="/dataset"><Nav.Link href="/dataset" style={{color: "#003da5" }}>Dataset</Nav.Link></Link>
                    </div>
                </Grid>
                {/* <Grid item xs={4}>
                    <div style={{textAlign:'center'}}>
                        <Link to="/home"><Nav.Link href="" style={{color: "#003da5" }}>About</Nav.Link></Link>
                    </div>
                </Grid> */}
                {/* <Grid item xs={4}>
                    <div style={{textAlign:'center', color: "#003da5"}}>
                        <div><EmailRoundedIcon /> </div>
                    </div>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <div style={{textAlign:'center', color: "#003da5"}}>info@maverics.io</div> 
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid> */}
                
            </Grid>
        </div>
    );
};




