import React from 'react'
import { Button, Typography, AppBar, Toolbar  } from '@mui/material'

import { useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();

    return (
        <AppBar position="static" className='topMenuBar'>
            <Toolbar>
                <div className='leftNav'>
                    <Button color="inherit" onClick={()=>navigate('/')}>
                        <Typography variant='h4'>
                            LBREP
                        </Typography>
                    </Button>
                </div>

                <div>
                    <Button className='listingsMenuBtn' color="inherit" onClick={()=>navigate('/listings')}>
                        <Typography variant='h6'>
                            Listings
                        </Typography>
                    </Button>
                    <Button className='agenciesMenuBtn' color="inherit">
                        <Typography variant='h6'>
                            Agencies
                        </Typography>
                    </Button>
                </div>

                <div className='rightNav'>
                    <Button className='propertyMenuBtn'>Add Property</Button>
                    <Button className='loginMenuBtn' onClick={()=>navigate('/login')}>Login</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header