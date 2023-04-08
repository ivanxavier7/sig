import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent } from '@mui/material';

import houseIconPng from './Assets/Mapicons/house.png';
import apartmentIconPng from './Assets/Mapicons/apartment.png';
import officeIconPng from './Assets/Mapicons/office.png'

import markerCardImage from  './Assets/img1.jpg';
import myListings from "./Assets/Data/Dummydata"

import polygonOne from './Shape';


function Listings() {
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40,40],
  })
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40,40],
  })
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40,40],
  })

  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);

  const position = [latitude, longitude]  // Mudar o centro para a ESTGA mais tarde

  function GoNorth() {
    setLatitude(latitude + 0.02);
    setLongitude(longitude);
  }

  function GoWest() {
    setLatitude(latitude);
    setLongitude(longitude - 0.02);
  }

  function GoSouth() {
    setLatitude(latitude - 0.02);
    setLongitude(longitude);
  }

  function GoEast() {
    setLatitude(latitude);
    setLongitude(longitude + 0.02);
  }

  function GoCenter() {
    setLatitude(51.505);
    setLongitude(-0.09);
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        <Button variant='contained' onClick={GoNorth} fullWidth>GO NORTH</Button>
        <Button variant='contained' onClick={GoWest} fullWidth>GO WEST</Button>
        <Button variant='contained' onClick={GoEast} fullWidth>GO EAST</Button>
        <Button variant='contained' onClick={GoSouth} fullWidth>GO SOUTH</Button>
        <Button variant='contained' onClick={GoCenter} fullWidth>CENTER</Button>
        {myListings.map((listing) => {
          return (
            <Card key={listing.id} className='cardMarker'>
              <CardHeader
              //action={
              //    <IconButton aria-label="settings">
              //    <MoreVertIcon />
              //    </IconButton>
              //}
              title={listing.title}
      
              />
              <CardMedia
              component="img"
              image={listing.picture1}
              alt={listing.title}
              className='cardMarkerImage'
              />
              <CardContent>
                  <Typography variant="body2">
                      {listing.description.substring(0, 210)}...
                  </Typography>
              </CardContent>

              {listing.property_status === "Sale" ? (
                <Typography className='housePrice'>
                  {listing.listing_type}: {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}€
                </Typography>
              ) : <Typography className='housePrice'>
                    {listing.listing_type}: {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}€ / {listing.rental_frequency}
                  </Typography>}

              
              {/*<CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                      <ShareIcon />
                  </IconButton>
              </CardActions>*/}
            </Card>
          )
        })}
      </Grid>
      <Grid item xs={8} className='leafletMap'>
        <AppBar position='sticky'>
          <div className='leafletMap'>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Polygon positions={polygonOne} color='red' fillColor='green' fillOpacity={0.35} opacity={0.25}></Polygon>

              {/* Marcadores importados do Assets/Data/Dummydata */}
              {myListings.map((listing)=>{
                function IconDisplay() {
                  {/* Conversao dos Icons consoante o tipo de dados */}
                  if(listing.listing_type === 'House') {
                    return houseIcon;
                  }
                  else if(listing.listing_type === 'Apartment') {
                    return apartmentIcon;
                  }
                  else if(listing.listing_type === 'Office') {
                    return officeIcon;
                  }
                }

                return (
                  <Marker
                    position={[listing.location.coordinates[0], listing.location.coordinates[1]]}
                    key={listing.id}
                    icon={IconDisplay()}
                  >
                    <Popup>
                      <Typography variant='h5'>{listing.title}</Typography>
                      <img src={listing.picture1} alt='Loading' className='markerCardImage'></img>
                      <Typography variant='body1'>{listing.description.substring(0, 158)}...</Typography>
                      <Button variant='contained' fullWidth>Details</Button>
                    </Popup>
                  </Marker>
                );
              })}

              {/* Marcador central estático de exemplo */}
              <Marker position={position} icon={officeIcon}>
                <Popup>
                  <Typography variant='h5'>A title for the Marker</Typography>
                  <img src={markerCardImage} alt='Loading' className='markerCardImage'></img>
                  <Typography variant='body1'>This is some text below the title</Typography>
                  <Button variant='contained' fullWidth>A Link</Button>
                </Popup>
              </Marker>

            </MapContainer>,
          </div>
        </AppBar>
      </Grid>
    </Grid>
  )
}

export default Listings