import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Papa from 'papaparse';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { darken, lighten } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core/styles';
import { GridToolbar } from '@mui/x-data-grid';


import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';
import { getDate } from 'date-fns';

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);


    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: .99,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string.isRequired,
};



function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default function Dataset() {

    var { data } = {
        rows: [],
        columns: []
    }

    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [backupRows, setBackupRows] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');
    const [loadData, setLoadData] = React.useState();
    const [alert, setAlert] = React.useState();
    const [showTable, setShowTable] = React.useState();
    const [initData, setInitData] = React.useState(true);

    // Chips
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'title' },
        { key: 1, label: 'author' },
        { key: 2, label: 'readme' },
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleResetOptions = () => {
        setChipData(
            [
                { key: 0, label: 'title' },
                { key: 1, label: 'author' },
                { key: 2, label: 'readme' },
            ]
        );
    }

    // Modal

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    //   const useStyles = makeStyles(theme => ({
    //     dialogPaper: {
           
    //         height : '400px'
    //     },
    // }));

    // // Date range
    // const [value, setValue] = React.useState([null, null]);

    // const requestSearch = (searchValue) => {
    //     setSearchText(searchValue);
    //     console.log(searchValue);
    //     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    //     const filteredRows = backupRows.filter((row) => {
    //         return Object.keys(row).some((field) => {
    //             return searchRegex.test(row['repo'].toString());
    //         });
    //     });
    //     setRows(filteredRows);
    // };


    // Custom Toolbar
    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
          </GridToolbarContainer>
        );
      }
    
    // Value repo link
    function getRepoUrl(params) {
        return `${ params.row.repo_name }`;
    }

    function getCreationDate(params) {
        
        return `${ params.row.creation_date ? params.row.creation_date.split('T')[0] : '' }`
    }

    function getUpdateDate(params) {
        return `${ params.row.lastupdated_date ?  params.row.lastupdated_date.split('T')[0] : '' }`
    }

    React.useEffect(() => {

        var url;
        if (initData || loadData) {

            if (initData) {
                url = 'https://btrev003.pythonanywhere.com/sourcefinder/api/repo/?title=' + searchInput;
                console.log(url);
            } else {
                var searchFields = '';
                for (let i = 0; i < chipData.length; i++) {
                    console.log(chipData[i].key);
                    console.log(chipData[i].label);
                    searchFields += chipData[i].key;
                }
                url = 'https://btrev003.pythonanywhere.com/sourcefinder/api/repo/?fields=' + searchFields + '&search=' + searchInput;
                console.log(url);
            }
            

            
            
            // fetch('https://btrev003.pythonanywhere.com/sourcefinder/api/repo/?title=' + searchInput)
            // fetch('btrev003.pythonanywhere.com/sourcefinder/api/repo/?fields=' + searchFields + '&search=' + 'malware')
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);

                    var repo_data = {};
                    repo_data.columns = [
                        { field: "id", hide: true, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        {
                            field: 'repo_name', renderCell: renderCellExpand, headerName: 'Repo', width: 300,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center',
                            renderCell: (params) => (
                                <Link href={"https://github.com/" + params.row.author_text + '/' + params.value} target={"_blank"} rel="noreferrer noopener">
                                    {params.value}
                                </Link>
                            ),
                            valueGetter: getRepoUrl,
                        },
                        {
                            field: 'author_text', headerName: 'Author', width: 200,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center',
                            renderCell: (params) => (
                                <Link href={"https://github.com/" + params.value} target={"_blank"} rel="noreferrer noopener">
                                    {params.value}
                                </Link>
                            ),
                        },
                        {
                            field: 'star_count', headerName: 'Star', width: 100,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },
                        {
                            field: 'fork_count', headerName: 'Fork', width: 100,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },
                        {
                            field: 'watch_count', headerName: 'Watch', width: 100,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },
                        {
                            field: 'creation_date', headerName: 'Creation Date', width: 150,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
                            type: 'date', 
                            valueGetter: getCreationDate,
                        },
                        {
                            field: 'lastupdated_date', headerName: 'Last Modified Date', width: 150,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
                            valueGetter: getUpdateDate,
                        },

                        {
                            field: 'language', renderCell: renderCellExpand, headerName: 'Language', width: 200,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },

                        {
                            field: 'topic', renderCell: renderCellExpand, headerName: 'Topic', width: 200,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },
                        {
                            field: 'family', renderCell: renderCellExpand, headerName: 'Family', width: 200,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },
                        {
                            field: 'platform', renderCell: renderCellExpand, headerName: 'Platform', width: 200,
                            headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
                        },
                    ];

                    repo_data.rows = [];
                    for (var i = 0; i < data.length; i++) {

                        var temp = {}
                        temp['id'] = i;
                        // temp['repo_name'] = (('repository_text' in data[i]) ? data[i]['repository_text'] : '');

                        if (('repository_text' in data[i])) {
                            // temp['repo_name'] = data[i]['repository_text'].split('/')[1] + '/' + data[i]['repository_text'].split('/')[0];
                            temp['repo_name'] = data[i]['repository_text'].split('/')[1];
                        } else {

                            temp['repo_name'] = '';
                        }

                        temp['author_text'] = (('author_text' in data[i]) ? data[i]['author_text'] : '');
                        temp['star_count'] = (('starcount_int' in data[i])) ? data[i]['starcount_int'] : '';
                        temp['fork_count'] = (('forkcount_int' in data[i])) ? data[i]['forkcount_int'] : '';
                        temp['watch_count'] = (('watchcount_int' in data[i])) ? data[i]['watchcount_int'] : '';
                        temp['creation_date'] = (('forkcount_int' in data[i])) ? data[i]['creation_date'] : '';
                        temp['lastupdated_date'] = (('watchcount_int' in data[i])) ? data[i]['lastupdated_date'] : '';
                        temp['language'] = (('language_text' in data[i])) ? data[i]['language_text'] : '';
                        temp['family'] = (('familiest_textlist' in data[i])) ? data[i]['familiest_textlist'] : '';
                        temp['platform'] = (('platforms_textlist' in data[i])) ? data[i]['platforms_textlist'] : '';
                        temp['topic'] = (('topics_textlist' in data[i])) ? data[i]['topics_textlist'] : '';
                        repo_data.rows.push(temp);
                    }


                    console.log(repo_data);
                    setRows(repo_data.rows);
                    setColumns(repo_data.columns);
                    setBackupRows(repo_data.rows);
                    setLoadData(false);
                    setShowTable(true);
                    setInitData(false);
                });
        }
    }, [loadData]);

    const handleSearchButton = (e) => {

        if (typeof e.keyCode === "undefined" || e.keyCode === 13) {

            if (searchInput.trim() === "") {
                // alert('No string');
                setAlert(true);

            } else {
                setLoadData(true);
            }
        }

    }


    return (
        <div style={{ marginTop: 10 }}>
            <Stack spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center">
                {showTable && <Stack spacing={2} direction="row">
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Search"
                            id="search_input"
                            value={searchInput}
                            onKeyDown={handleSearchButton}
                            onChange={(event) => {
                                setSearchInput(event.target.value);
                                setAlert(false);
                            }} />

                    </Box>
                    <Button variant="outlined"
                        onClick={handleSearchButton}
                    >
                        Search
                    </Button>

                    {alert ? <Alert severity='error'>No search parameter given</Alert> : <></>}
                    <Button variant="outlined" onClick={handleOpen}>Search Options</Button>
                    
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                        {"Update Search Options"}
                        </DialogTitle>
                        <DialogContent>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                    minHeight: 100,
                                    padding: '25px'
                                }}
                                component="ul"
                            >
                                {chipData.map((data) => {
                                    return (
                                        <ListItem key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onDelete={handleDelete(data)}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleResetOptions}>
                            Reset
                        </Button>
                        <Button onClick={handleClose} autoFocus>
                            Save Changes
                        </Button>
                        </DialogActions>
                    </Dialog>
                    

                    

                </Stack>
}
                {(initData || loadData) && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                }

                {showTable &&
                    <Box sx={{
                        height: 500, width: 1000,
                        '& .super-app-theme--header': {
                            backgroundColor: '#f0ede7',
                            fontWeight: '900',
                        },

                    }}
                    >

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowClassName={(params) => `super-app-theme--row`}
                            components={{ Toolbar: CustomToolbar }}
                            disableSelectionOnClick
                        />
                    </Box>
                }
            </Stack>
            
        </div >
    );
}
