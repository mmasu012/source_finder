import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Papa from 'papaparse';

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.5,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottom: 1,
                        borderColor: 'divider',
                    },
                }}
            />
        </Box>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

// const VISIBLE_FIELDS = ['repo', 'author', 'forks_count', 'stars_count', 'isAdmin'];
// const VISIBLE_FIELDS = ['repo', 'author'];

export default function Dataset() {

    var { data } = useDemoData({
        dataSet: 'Employee',
        // visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });

    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(data.rows);
    const [columns, setColumns] = React.useState(data.rows);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        console.log(data);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {

        Papa.parse('repo_data.csv', {
            download: true,
            delimiter: ',',
            complete: function (results) {
                var repo_data = {};
                repo_data.columns = [];
                repo_data.columns.push({
                    field: "id", 
                    hide: true,
                });
                for (var i = 0; i < results.data[0].length; i++) {
                    repo_data.columns.push({
                        field: results.data[0][i].trim(),
                        headerName: results.data[0][i].trim(),
                        width: 200,
                    })
                }

                repo_data.rows = []
                for (var i = 1; i < results.data.length; i++) {

                    var temp = {}
                    temp['id'] = i;
                    for (var j = 0; j < results.data[i].length; j++) {
                        temp[results.data[0][j].trim()] = results.data[i][j];                       
                    }
                    repo_data.rows.push(temp);
                }
                console.log(repo_data);
                console.log(results);
                setRows(repo_data.rows);
                setColumns(repo_data.columns);
            }
        });

        // setRows(data.rows);
    }, [data.rows]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Box sx={{ height: 500, width: 1000 }}>
                <DataGrid
                    components={{ Toolbar: QuickSearchToolbar }}
                    rows={rows}
                    columns={columns}
                    componentsProps={{
                        toolbar: {
                            value: searchText,
                            onChange: (event) => requestSearch(event.target.value),
                            clearSearch: () => requestSearch(''),
                        },
                    }}
                />
            </Box>
        </div>
    );
}
