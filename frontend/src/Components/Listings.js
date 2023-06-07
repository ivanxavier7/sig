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
} from "@mui/material";

import RoomIcon from "@mui/icons-material/Room";
//Filter Card Icons
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
//Choose starting place Button Icon
import HomeIcon from "@mui/icons-material/Home";
// Map icons
import houseIconPng from "./Assets/Mapicons/house.png";
import apartmentIconPng from "./Assets/Mapicons/apartment.png";
import officeIconPng from "./Assets/Mapicons/office.png";
// Assets
import img1 from "./Assets/img1.jpg";
import myListings from "./Assets/Data/Dummydata";

function Listings() {
  //Funcao do button group dos filtros, mudar para mostrar os tempos diferentes - Tomás
  const [alignment, setAlignment] = React.useState("web");

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
        main: "#488100",
      },
      error: {
        main: "#e57373",
      },
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
                key={listing.id}
                style={{
                  margin: "0.5rem",
                  border: "1px solid black",
                  position: "relative",
                }}
              >
                <CardHeader
                  action={
                    <IconButton
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
                  title={listing.title}
                />
                <CardMedia
                  className="imagem-card-estagio"
                  component="img"
                  image={listing.picture1}
                  alt={listing.title}
                  onClick={() => navigate(`/listings/${listing.id}`)}
                />
                <CardContent>
                  <Typography variant="body2">
                    {listing.description.substring(0, 200)}...
                  </Typography>
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
                        max={100}
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
              </div>
              <MapContainer
                center={[40.574436706354, -8.44588251531503]}
                zoom={12}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
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
                      color="primary"
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
