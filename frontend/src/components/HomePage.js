import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageSlider from './ImageSlider';
import '../App.scss';
import Grid from '@mui/material/Grid';
import PaperInfo from './PaperInfo';

export default function HomePage() {


    return (
        <div>
            <div>
                <Card style={{ borderRadius: 0, boxShadow: 'none'}}>
                    <CardContent style={{ backgroundColor:'#E1F3F8' }}>
                        <Typography gutterBottom variant="h4" component="div" align='center'>
                        SourceFinder: A large database of publicly available malware source-code
                        </Typography>
                    </CardContent>
                    <ImageSlider />
                </Card>
            </div>
            <div>
                <PaperInfo />
            </div>
        </div>
    );
};
