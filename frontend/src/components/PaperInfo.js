import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Image from '../Images/first_page.png';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const text = 'Our work capitalizes on a great missed opportunity: there are thousands of malware ' +
    'source code repositories on GitHub. At the same time, there is a scarcity of malware ' +
    'source code, which is necessary for certain research studies. \n' +
    'Our work is arguably the first to develop a systematic approach to extract malware ' +
    'source-code repositories at scale from GitHub. Our work provides two main tangible outcomes: ' +
    '(a) we develop SourceFinder, which identifies malware repositories with 89% precision, and ' +
    '(b) we create, possibly, the largest non-commercial malware source code archive with ' +
    '7504 repositories. Our large scale study provide some interesting trends for both the ' +
    'malware repositories and the dynamics of the malware authors.\n' +
    'We intend to open-source both SourceFinder and the database of malware source code to ' +
    'maximize the impact of our work. Our ambitious vision is to become the authoritative ' +
    'source for malware source code for the research community by providing tools, databases, and benchmarks.';

export default function PaperInfo() {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 800,
                flexGrow: 1,
                backgroundColor: (theme) =>
                '#003da526'
            }}
        >

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Read our paper</h1>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                        <p>
                            {text}
                        </p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <ButtonBase >
                        <Img alt="complex" src={Image} />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    );
}
