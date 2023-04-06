
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

function CustomCard() {
  return (
    <div>
        
    <h1>This is the homepage</h1>
    <br />
    <Link to='/login'>Login</Link>
    <br />
    <Link to='/listings'>Listings</Link>
    <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
            Success
        </Button>
        <Button variant="outlined" color="error">
            Error
        </Button>
    </Stack>

    <Typography variant='h4' align='center'>
        Este é um exemplo de um título
    </Typography>

    <Typography variant='body2' align='center' style={{ border: "2px solid black", padding: "15px",}}>
        Este é um exemplo de um título Este é um exemplo de um título Este é um exemplo de um título
        Este é um exemplo de um título
        Este é um exemplo de um título
        Este é um exemplo de um títuloEste é um exemplo de um título
        Este é um exemplo de um títuloEste é um exemplo de um título Este é um exemplo de um título
        Este é um exemplo de um título Este é um exemplo de um título
    </Typography>


    <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' align='center' md={6}>
                        Este é um exemplo de um título
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4' align='center'>
                    Este é um exemplo de um título
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4' align='center' md={6}>
                        Este é um exemplo de um título
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4' align='center'>
                        Este é um exemplo de um título
                    </Typography>
                </Grid>
            </Grid>
    </Box>
</div>
  )
}

export default CustomCard