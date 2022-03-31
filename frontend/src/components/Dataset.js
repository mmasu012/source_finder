import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Papa from 'papaparse';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { darken, lighten } from '@mui/material/styles';


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

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        console.log(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = backupRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row['repo'].toString());
            });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {

        if (loadData) {

            fetch('https://btrev003.pythonanywhere.com/sourcefinder/api/repo/?title=' + searchInput)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);

                    var repo_data = {};
                    repo_data.columns = [
                        { field: "id", hide: true, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'repo_name', headerName: 'Repo', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'author_text', headerName: 'Author', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'star_count', headerName: 'Star', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'fork_count', headerName: 'Fork', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'watch_count', headerName: 'Watch', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'topic', headerName: 'Topic', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'family', headerName: 'Family', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                        { field: 'platform', headerName: 'Platform', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center' },
                    ];

                    repo_data.rows = [];
                    for (var i = 0; i < data.length; i++) {

                        var temp = {}
                        temp['id'] = i;
                        temp['repo_name'] = (('repository_text' in data[i]) ? data[i]['repository_text'] : '');
                        temp['author_text'] = (('author_text' in data[i]) ? data[i]['author_text'] : '');
                        temp['star_count'] = (('starcount_int' in data[i])) ? data[i]['starcount_int'] : '';
                        temp['fork_count'] = (('forkcount_int' in data[i])) ? data[i]['forkcount_int'] : '';
                        temp['watch_count'] = (('watchcount_int' in data[i])) ? data[i]['watchcount_int'] : '';
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
                });
        }
    }, [loadData]);

    const handleSearchButton = () => {

        if (searchInput.trim() === "") {
            // alert('No string');
            setAlert(true);

        } else {
            setLoadData(true);
        }

    }


    return (
        <div style={{ marginTop: 10 }}>
            <Stack spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Stack spacing={2} direction="row">
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

                </Stack>

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
                            components={{ Toolbar: GridToolbar }}
                        // componentsProps={{
                        //     toolbar: {
                        //         value: searchText,
                        //         onChange: (event) => requestSearch(event.target.value),
                        //         clearSearch: () => requestSearch(''),
                        //     },
                        // }}
                        />
                    </Box>
                }
            </Stack>
        </div >
    );
}
