import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Image from '../Images/first_page.png';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
                'tools are cordially encouraged to contact us. \n';
                
const citationRequest = 'We request that anyone who uses our platform cites our work as';
const citationText = 'Rokon, Md Omar Faruk, et al. \"{SourceFinder}: Finding Malware {Source-Code} from Publicly Available Repositories in {GitHub}.\" 23rd International Symposium on Research in Attacks, Intrusions and Defenses (RAID 2020). 2020.';

export default function PaperInfo() {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: '100%',
                flexGrow: 1,
                // backgroundColor: (theme) =>
                // '#003da526'
            }}
        >

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Read our paper
                        <Link href={"https://www.usenix.org/system/files/raid20-rokon.pdf"} target={"_blank"} rel="noreferrer noopener">
                            [PDF]
                        </Link>
                        <Link href='/dataset' target={"_blank"} rel="noreferrer noopener">
                            [Dataset]
                        </Link>
                        </h1>
                    </div>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                    <div style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                        <Typography  variant="h6">
                            <Box sx={{ fontWeight: 'bold', m: 1 }}>
                                What is SourceFinder
                            </Box>
                        </Typography>
                        <Typography  variant="subtitle1"  align='justify'>
                            <Box sx={{ fontWeight: 'medium', m: 1, fontFamily: 'Helvetica' }}>
                                {text}
                            </Box>
                        </Typography>
                        <Typography  variant="h6">
                            <Box sx={{ fontWeight: 'bold', m: 1 }}>
                                How to view and download our dataset
                            </Box>
                        </Typography>
                        <Typography  variant="subtitle1"  align='justify'>
                            <Box sx={{ fontWeight: 'medium', m: 1, fontFamily: 'Helvetica' }}>
                            <ListItem component="a" >
                                <ListItemText primary="Go to this link" />
                                <Link href='/dataset' target={"_blank"} rel="noreferrer noopener">
                                    [Dataset]
                                </Link>
                            </ListItem>
                            </Box>
                        </Typography>
                        <Typography  variant="h6">
                            <Box sx={{ fontWeight: 'bold', m: 1 }}>
                                Citation Request
                            </Box>
                        </Typography>
                        <Typography  variant="subtitle1"  align='justify'>
                            <Box sx={{ fontWeight: 'medium', m: 1, fontFamily: 'Helvetica' }}>
                                {citationRequest}
                            </Box>
                            <Box sx={{ color: 'blue', fontWeight: 'medium', m: 1, fontFamily: 'Monospace' }}>
                                {citationText}
                            </Box>
                        </Typography>
                        <Typography  variant="h6">
                            <Box sx={{ fontWeight: 'bold', m: 1 }}>
                                Contact us
                            </Box>
                        </Typography>
                        <Typography  variant="subtitle1"  align='justify'>
                            <Box sx={{ fontWeight: 'bold', m: 1, fontFamily: 'Helvetica' }}>
                                {"Contact information: mroko001@ucr.edu"}
                            </Box>
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <ButtonBase >
                        <Link href={"https://www.usenix.org/system/files/raid20-rokon.pdf"} target={"_blank"} rel="noreferrer noopener">
                            <Img alt="complex" src={Image} />
                        </Link>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    );
}
