import React, {useState} from 'react'
import { Container, InputAdornment, Grid } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { Breadcrumbs, Button, DataGrid, LinearProgressWithDescription, TextInput } from "../../shared/components";
import {HistoryTable} from "../components"
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

import "../styles/TermsAndCondition.css"
import { downloadIcon } from "../images";

const data = [
    {
        id:1,
        title:"Motorizado mensajero", 
        publicationdate:"2021-03-04T00:18:48.000Z",
        createdBy:"Jean Carlo",
        items:"Motorizado y courier",
        postulantScope:180,
        postulantProgress:120,
        postulantContract:70
    },
    {
        id:2,
        title:"Motorizado mensajero", 
        publicationdate:"2021-03-04T00:18:48.000Z",
        createdBy:"Jean Carlo",
        items:"Motorizado y courier",
        postulantScope:180,
        postulantProgress:120,
        postulantContract:70
    },
    {
        id:3,
        title:"Motorizado mensajero", 
        publicationdate:"2021-03-04T00:18:48.000Z",
        createdBy:"Jean Carlo",
        items:"Motorizado y courier",
        postulantScope:180,
        postulantProgress:120,
        postulantContract:70
    },
]

const columns = [
    { field: 'title', headerName: 'Título de la publicación', width: 250, sortable: true},
    { field: 'publicationDate', headerName: 'Fecha de publicación', width: 180, sortable: true,  
        // valueGetter: (params) => moment(params.value).format("YYYY-MM-DD")  
    },
    { field: 'createdBy', headerName: 'Creado por', width: 200, sortable: false },
    { field: 'items', headerName: 'Rubro del puesto', width: 180, sortable: false },
    { field: 'statitics', headerName: 'Interacción de la publicación', width: 250, sortable: false, renderCell: (params) => {
        return (
            <div className="statistics__container">
                <LinearProgressWithDescription title="180" description="Postulantes alcanzados" value={80}/>
            </div>
        )
    }},
    {
        field: 'actions', headerName: 'Acciones', width: 130, sortable: false, renderCell: (params) => {
            return <Button color="primary" onClick={() => console.log("hice click")}>Ver</Button>
        }
    },
];

export default function History() {
    const [selectedRow, setSelectedRow] = useState([]);
    const [searchInput, setSearchInput] = useState(null);
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "HISTORIAL", to: `${initRoute}` }];

    const handleEnableButton = (rowsSelected) => {
        setSelectedRow(rowsSelected)
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="space-between">
                        <Grid item xs={6}>
                        <Button 
                            startIcon={<img src={downloadIcon} alt="descargar" />} 
                            variant="contained" 
                            color="secondary" 
                            size="large" 
                            disabled={!(selectedRow.length > 0)}
                            >
                                DESCARGA
                        </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={1}>
                                    <SearchIcon />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextInput
                                        // InputProps={{startAdornment: (
                                        //     <InputAdornment position="start">
                                        //       buscar
                                        //     </InputAdornment>
                                        // )}}
                                        name="search"
                                        label="Buscar por titulo de publicación"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <HistoryTable handleEnableButtonDownload={handleEnableButton} searchInput={searchInput}/>
                    {/* <DataGrid 
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 30]}
                        hideFooterSelectedRowCount 
                        autoHeight
                        rowHeight={200}
                    /> */}
                </Grid>
            </Grid>
        </Container>
    )
}