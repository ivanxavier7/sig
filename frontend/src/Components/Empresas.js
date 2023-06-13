import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";

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
  CardActions,
} from "@mui/material";

function Empresas() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    dataIsLoading: true,
    empresasList: [],
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchEmpresas":
        draft.empresasList = action.empresasArray;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get all profiles
  useEffect(() => {
    async function GetEmpresas() {
      try {
        const response = await Axios.get(
          `http://www.localhost:8000/api/profiles/`
        );

        dispatch({
          type: "catchEmpresas",
          empresasArray: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetEmpresas();
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
    <Grid
      container
      justifyContent="flex-start"
      spacing={2}
      style={{
        minHeight: "830px",
        padding: "16rem",
      }}
    >
      {state.empresasList.map((empresa) => {
        function CompaniesDisplay() {
          if (empresa.seller_listings.length === 0) {
            return (
              <Button
                disabled size="small"
                className="custom-anchor-text"
              >
                Sem Estágios
              </Button>
            );
          } else if (empresa.seller_listings.length === 1) {
            return (
              <Button
                className="custom-anchor-text"
                size="small"
                onClick={() => navigate(`/empresas/${empresa.seller}`)}
              >
                Um Estágio listado
              </Button>
            );
          } else {
            return (
              <Button
                className="custom-anchor-text"
                size="small"
                onClick={() => navigate(`/empresas/${empresa.seller}`)}
              >
                {empresa.seller_listings.length} Estágios
              </Button>
            );
          }
        }

        if (empresa.agency_name && empresa.phone_number)
          return (
            <Grid
              key={empresa.id}
              item
              style={{ marginTop: "1rem", maxWidth: "20rem" }}
            >
              <Card className="company-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    empresa.profile_picture
                      ? empresa.profile_picture
                      : defaultProfilePicture
                  }
                  alt="Foto de Perfil"
                />
                <CardContent>
                  <Typography className="custom-theme-title" gutterBottom variant="h5" component="div">
                    {empresa.agency_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {empresa.bio.substring(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions>{CompaniesDisplay()}</CardActions>
              </Card>
            </Grid>
          );
      })}
    </Grid>
  );
}

export default Empresas;
