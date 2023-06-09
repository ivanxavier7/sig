import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
// React leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  AppBar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Box,
  Fab,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ButtonGroup,
  Chip,
} from "@mui/material";

import RoomIcon from "@mui/icons-material/Room";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
//Filter Card Icons
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import MapIcon from "@mui/icons-material/Map";
//Choose starting place Button Icon
import HomeIcon from "@mui/icons-material/Home";
// Map icons
import houseIconPng from "./Assets/Mapicons/house.png";
import apartmentIconPng from "./Assets/Mapicons/apartment.png";
import officeIconPng from "./Assets/Mapicons/office.png";
// Assets
import img1 from "./Assets/img1.jpg";
import myListings from "./Assets/Data/Dummydata";

import { useCallback, useMemo, useRef } from "react";
const center = {
  lat: 40.574436706354,
  lng: -8.44588251531503,
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

function Listings() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log("COORDS = " + location.latitude);
        },
        (error) => {
          console.error("Error occurred: " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  //Funcao do button group dos filtros, mudar para mostrar os tempos diferentes - Tomás
  const ref = React.useRef(null);
  const [alignment, setAlignment] = React.useState("web");

  const normalMap =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const satelliteMap =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  const [mapLayer, setMapLayer] = React.useState(true);

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(mapLayer ? satelliteMap : normalMap);
    }
  }, [mapLayer]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });

  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  });

  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  });

  const [latitude, setLatitude] = useState(51.48740865233002);
  const [longitude, setLongitude] = useState(-0.12667052265135625);

  const initialState = {
    mapInstance: null,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  function TheMapComponent() {
    const map = useMap();
    dispatch({ type: "getMap", mapData: map });
    return null;
  }

  function GoEast() {
    setLatitude(51.46567014039476);
    setLongitude(0.2596173538795676);
  }

  function GoCenter() {
    setLatitude(51.48740865233002);
    setLongitude(-0.12667052265135625);
  }

  const polyOne = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];

  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "http://localhost:8000/api/listings/",
          { cancelToken: source.token }
        );

        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllListings();
    return () => {
      source.cancel();
    };
  }, []);

  if (dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "10vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#73A800",
      },
      secondary: {
        main: "#ffffff",
      },
      error: {
        main: "#e57373",
      },
      divider: "#73A800",
    },
  });

  function valuetext(value) {
    return `${value} minutos`;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={4}>
          {allListings.map((listing) => {
            return (
              <Card
                className="internship-info-card"
                key={listing.id}
                style={{
                  backgroundImage: `url(${listing.picture1})`,
                }}
              >
                <CardHeader
                  action={
                    <IconButton
                      color="secondary"
                      aria-label="settings"
                      onClick={() =>
                        state.mapInstance.flyTo(
                          [listing.latitude, listing.longitude],
                          16
                        )
                      }
                    >
                      <RoomIcon />
                    </IconButton>
                  }
                  title={
                    <Typography
                      className="internship-card-title"
                      onClick={() => navigate(`/listings/${listing.id}`)}
                      variant="h5"
                      color="secondary"
                    >
                      {listing.title}
                      <ArrowForwardIosIcon sx={{ ml: 1 }} />
                    </Typography>
                  }
                />
                {/* 
                <CardMedia
                  className="internship-card-image"
                  component="img"
                  image={listing.picture1}
                  alt={listing.title}
                  onClick={() => navigate(`/listings/${listing.id}`)}
                />
                */}
                <CardContent>
                  <Typography variant="body2">
                    {listing.description.substring(0, 200)}
                  </Typography>
                  <Chip label="React" color="error" className="react" />
                  <Chip label="Angular" color="error" className="angular" />
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    {listing.seller_agency_name}
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
        <Grid item xs={8} style={{ marginTop: "0.5rem", position: "relative" }}>
          <AppBar position="sticky">
            <div style={{ height: "100vh" }}>
              <div className="filter-container">
                <div id="filter-sub-container">
                  <Card className="filter-card">
                    <CardContent sx={{ padding: 0 }}>
                      <ToggleButtonGroup
                        sx={{ width: "100%" }}
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                      >
                        <ToggleButton
                          value="walking"
                          sx={{ flexGrow: 1, width: "33.33%" }}
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <HikingIcon />
                            <Typography variant="body2" sx={{ fontSize: 13 }}>
                              A pé
                            </Typography>
                          </Box>
                        </ToggleButton>
                        <ToggleButton
                          value="bike"
                          sx={{
                            flexGrow: 1,
                            width: "33.33%",
                          }}
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            sx={{
                              paddingLeft: "20px",
                              paddingRight: "20px",
                            }}
                          >
                            <DirectionsBikeIcon />
                            <Typography variant="body2" sx={{ fontSize: 13 }}>
                              Bicicleta
                            </Typography>
                          </Box>
                        </ToggleButton>
                        <ToggleButton
                          value="driving"
                          sx={{ flexGrow: 1, width: "33.33%" }}
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <DriveEtaIcon />
                            <Typography variant="body2" sx={{ fontSize: 13 }}>
                              Carro
                            </Typography>
                          </Box>
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <div className="filter-card-content">
                        <Typography
                          sx={{ fontSize: 14, mt: "15px", mb: 0 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Tempo de viagem
                        </Typography>
                        <Slider
                          aria-label="TempoViagem"
                          defaultValue={30}
                          getAriaValueText={valuetext}
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={10}
                          max={120}
                        />
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="body1"
                                color="text.secondary"
                              >
                                Ver empresas sem ofertas
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </div>
                    </CardContent>
                    <CardActions id="filter-card-bottom" color="error">
                      <Button variant="text">Aplicar</Button>
                      <Button variant="text">Reset</Button>
                    </CardActions>
                  </Card>
                  <ButtonGroup
                    fullWidth="true"
                    id="filter-button-group"
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      onClick={fetchUserLocation}
                      className="starting-point-button "
                      color="secondary"
                    >
                      <HomeIcon color="primary" />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 14, fontWeight: "500" }}
                        color="primary"
                      ></Typography>
                    </Button>

                    <Button
                      className="map-layer-button"
                      color="secondary"
                      onClick={() => setMapLayer(!mapLayer)}
                    >
                      <MapIcon />
                    </Button>
                  </ButtonGroup>
                  {/* 
                  <Fab
                    className="starting-point-button"
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                  >
                    <HomeIcon sx={{ mr: 2 }} />
                    ponto de partida
                  </Fab>
                  */}
                </div>
                {/* 
                <Fab
                  className="map-layer-button"
                  variant=""
                  size="small"
                  color="secondary"
                  aria-label="add"
                  onClick={() => setMapLayer(!mapLayer)}
                >
                  <MapIcon />
                </Fab>
                 */}
              </div>
              <MapContainer
                center={[40.574436706354, -8.44588251531503]}
                zoom={12}
                scrollWheelZoom={true}
              >
                <TileLayer
                  ref={ref}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={mapLayer ? normalMap : satelliteMap}
                />
                <DraggableMarker />
                <TheMapComponent />

                {allListings.map((listing) => {
                  function IconDisplay() {
                    if (listing.listing_type === "House") {
                      return houseIcon;
                    } else if (listing.listing_type === "Apartment") {
                      return apartmentIcon;
                    } else if (listing.listing_type === "Office") {
                      return officeIcon;
                    }
                  }
                  return (
                    <Marker
                      key={listing.id}
                      icon={IconDisplay()}
                      position={[listing.latitude, listing.longitude]}
                    >
                      <Popup>
                        <Typography variant="h5">{listing.title}</Typography>
                        <img
                          src={listing.picture1}
                          style={{
                            height: "14rem",
                            width: "18rem",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/listings/${listing.id}`)}
                        />
                        <Typography variant="body1">
                          {listing.description.substring(0, 150)}...
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => navigate(`/listings/${listing.id}`)}
                        >
                          Details
                        </Button>
                      </Popup>
                    </Marker>
                  );
                })}

                {/* <Marker icon={officeIcon} position={[latitude, longitude]}>
									<Popup>
										<Typography variant="h5">A title</Typography>
										<img src={img1} style={{ height: "14rem", width: "18rem" }} />
										<Typography variant="body1">
											This is some text below the title
										</Typography>
										<Button variant="contained" fullWidth>
											A Link
										</Button>
									</Popup>
								</Marker> */}
              </MapContainer>
            </div>
          </AppBar>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Listings;
