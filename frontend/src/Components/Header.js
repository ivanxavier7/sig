import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// MUI imports
import {
  Button,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";

// Contexts
import StateContext from "../Contexts/StateContext";
import DispatchContext from "../Contexts/DispatchContext";
import logo from "./Assets/logo.svg";
function Header() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function HandleProfile() {
    setAnchorEl(null);
    navigate("/perfil");
  }

  const [openSnack, setOpenSnack] = useState(false);

  async function HandleLogout() {
    setAnchorEl(null);
    const confirmLogout = window.confirm(
      "Tens a certeza que queres dar logout?"
    );
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          "http://localhost:8000/api-auth-djoser/token/logout/",
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );

        GlobalDispatch({ type: "logout" });
        setOpenSnack(true);
      } catch (e) {}
    }
  }

  useEffect(() => {
    if (openSnack) {
      setTimeout(() => {
        navigate(0);
      }, 1500);
    }
  }, [openSnack]);

  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <div style={{ marginRight: "auto", marginLeft: "10rem" }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            <img
              className=""
              src={logo}
              style={{
                height: "45px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />{" "}
          </Button>
        </div>
        <div>
          <Button
            className="botoes-navbar-hover"
            onClick={() => navigate("/listings")}
            style={{ marginRight: "1rem" }}
            variant="text"
            color="inherit"
          >
            Estágios
          </Button>
          <Button
            className="botoes-navbar-hover"
            color="inherit"
            style={{ marginLeft: "1rem" }}
            onClick={() => navigate("/empresas")}
          >
            Empresas
          </Button>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "10rem" }}>
          <Button
            className="botoes-navbar-hover adicionar-estagio"
            onClick={() => navigate("/adicionarestagio")}
            color="inherit"
          >
            Adicionar Estagio
          </Button>

          {GlobalState.userIsLogged ? (
            <Button className="texto-contraste botao-user-hover" onClick={handleClick}>
              {GlobalState.userUsername}
            </Button>
          ) : (
            <Button 
            id="botao-login-navbar"
              variant="contained"
            
              className="perfil"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem className="perfil" onClick={HandleProfile}>
              Perfil
            </MenuItem>
            <MenuItem className="perfil" onClick={HandleLogout}>
              Logout
            </MenuItem>
          </Menu>
          <Snackbar
            open={openSnack}
            message="Logout com sucesso!"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
