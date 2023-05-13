import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI imports
import { Button, Typography, Grid, AppBar, Toolbar } from "@mui/material";

// Components
import Header from "./Header";

// Assets
import city from "./Assets/uaBg.jpg";

function Home() {
  const [btnColor, setBtnColor] = useState("error");

  return (
    <>
      <div
        className="container-home"
        style={{
          backgroundImage: `url(${city})`,
        }}
      >
        <div className="container-titulo-home">
          <Typography id="titulo-home">
            Encontra o teu próximo estágio
          </Typography>
          <Button
            id="botao-ver-estagios-home"
            href="/listings"
            variant="contained"
          >
            Ver estágios
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
