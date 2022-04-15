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

// const text = 'Our work capitalizes on a great missed opportunity: there are thousands of malware ' +
//     'source code repositories on GitHub. At the same time, there is a scarcity of malware ' +
//     'source code, which is necessary for certain research studies. \n' +
//     'Our work is arguably the first to develop a systematic approach to extract malware ' +
//     'source-code repositories at scale from GitHub. Our work provides two main tangible outcomes: ' +
//     '(a) we develop SourceFinder, which identifies malware repositories with 89% precision, and ' +
//     '(b) we create, possibly, the largest non-commercial malware source code archive with ' +
//     '7504 repositories. Our large scale study provide some interesting trends for both the ' +
//     'malware repositories and the dynamics of the malware authors.\n' +
//     'We intend to open-source both SourceFinder and the database of malware source code to ' +
//     'maximize the impact of our work. Our ambitious vision is to become the authoritative ' +
//     'source for malware source code for the research community by providing tools, databases, and benchmarks.';


const text = 'How would having access to malware source-code enable your research? '  + 
                'SourceFinder is an initiative to enable malware research by identifying roughly ' + 
                '7500 public repositories (currently from GitHub) that contain malware source-code. ' + 
                'These malware repositories were identified by our group and the details are provided ' +
                'in the peer-reviewed article below (RAID 2020). The platform supports a [light search capability] ' + 
                'that provides the basic metadata of the repositories of interest. Note that the actual source-code ' +
                'can be retrieved from GitHub. For researchers interested in getting access to more data and our ' + 
                'tools are cordially encouraged to contact us. \n' +  
                '\n' + 
                'We request that anyone who uses our platform cites our work as .\n' +
                '@article{rokon2020sourcefinder,\n' +
                    '   title={Sourcefinder: Finding malware source-code from publicly available repositories}, \n' +
                    '   author={Rokon, Md Omar Faruk and Islam, Risul and Darki, Ahmad and Papalexakis, Vagelis E and Faloutsos, Michalis},\n' +
                    '   journal={arXiv preprint arXiv:2005.14311},\n' +
                    '   year={2020}\n' +
                  '}\n' +
                'Contact information: xxxx@xxxx';

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
