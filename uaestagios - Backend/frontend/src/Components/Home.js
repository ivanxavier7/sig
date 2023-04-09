import React from 'react'
//import React, { useState} from 'react'
import { Button, Typography  } from '@mui/material'

import city from './Assets/city.jpg'


function Home() {
    //const [btnColor, setBtnColor] = useState("error");

    return (
        <>
            
            <img src={city} className='backgroundImage' alt='Loading Background' />

            <div className='overlayHomepageText'>
                    <Typography variant='h1' className='homepageText'>FIND YOUR <span className='primaryColor'>NEXT PROPERTY</span> ON THE LBREP WEBSITE</Typography>
                    <Button variant='contained' className='homepageBtn'>SEE ALL PROPERTIES</Button>
            </div>
        </>
    )
}

export default Home