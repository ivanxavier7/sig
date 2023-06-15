import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// MUI
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
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  CardActions,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function AgencyDetail() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const params = useParams();

  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      profilePic: "",
      bio: "",
      sellerListings: [],
    },
    dataIsLoading: true,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        draft.userProfile.sellerListings = action.profileObject.seller_listings;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/profiles/${params.id}/`
        );

        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetProfileInfo();
  }, []);

  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div>
      {" "}
      <Grid
        container
        style={{
          paddingTop: "20px ",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Card className="component-box-shadow-no-hover" sx={{ width: "40rem" }}>
          <CardMedia
            component="img"
            height="140"
            image={
              state.userProfile.profilePic !== null
                ? state.userProfile.profilePic
                : defaultProfilePicture
            }
            alt={state.userProfile.agencyName}
          />
          <CardContent>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography gutterBottom variant="h5" component="div">
                  {state.userProfile.agencyName}
                </Typography>
                <Box display="flex" alignItems="center">
                  <LocalPhoneIcon
                    style={{ fontSize: "inherit" }}
                    sx={{ color: "text.secondary", mr: 0.5 }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {state.userProfile.phoneNumber}
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box flex={2} style={{ padding: "10px" }}>
                <Typography>{state.userProfile.bio}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* 
      <Grid
        container
        className="company-info-box"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          border: "5px solid black",
          marginTop: "1rem",
          padding: "5px",
        }}
      >
        <Grid item xs={6}>
          <img
            style={{ height: "100%", width: "15rem" }}
            src={
              state.userProfile.profilePic !== null
                ? state.userProfile.profilePic
                : defaultProfilePicture
            }
          />
        </Grid>
        <Grid item container direction="column" justifyContent="center" xs={6}>
          <Grid item>
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              <span style={{ color: "green", fontWeight: "bolder" }}>
                {state.userProfile.agencyName}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              <LocalPhoneIcon /> {state.userProfile.phoneNumber}
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: "1rem", padding: "5px" }}>
          {state.userProfile.bio}
        </Grid>
      </Grid>
      */}
      <Grid
        container
        justifyContent="flex-start"
        spacing={2}
        style={{ padding: "10px 20px 30px 20px" }}
      >
        {state.userProfile.sellerListings.map((listing) => {
          return (
            <Grid
              key={listing.id}
              item
              style={{ marginTop: "1rem", maxWidth: "20rem" }}
            >
              <Card
                className="company-card component-box-shadow"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    listing.picture1
                      ? "http://localhost:8000" + listing.picture1
                      : defaultProfilePicture
                  }
                  alt="Listing Picture"
                  onClick={() => navigate(`/listings/${listing.id}`)}
                  style={{ cursor: "pointer" }}
                />

                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {listing.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.description.length > 100
                      ? `${listing.description.substring(0, 100)}...`
                      : listing.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {`${listing.listing_type}: ${listing.vacancies
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} horas /${
                    listing.internship_bachelor
                  }`}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default AgencyDetail;
