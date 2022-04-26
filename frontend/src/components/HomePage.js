import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageSlider from './ImageSlider';
import '../App.scss';
import Grid from '@mui/material/Grid';
import PaperInfo from './PaperInfo';
import Box from '@mui/material/Box';

export default function HomePage() {

    return (
        <Grid container >
            <Grid item xs={12} >
                <Card style={{ borderRadius: 0, boxShadow: 'none'}}>
                    <CardContent style={{ backgroundColor:'white' }}>

                        <Typography  variant="h4"  align='center'>
                        <Box sx={{ fontWeight: 'bold', m: 1 }}>
                            Welcome to the largest reference database of malware source-code
                        </Box>
                        </Typography>
                    </CardContent>
                    <ImageSlider />
                </Card>
            </Grid>
            <Grid item xs={12} >
                <PaperInfo />
            </Grid>
        </Grid>
    );
};
