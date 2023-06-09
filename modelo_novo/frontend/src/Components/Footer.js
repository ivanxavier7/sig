import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { GitHub, GpsFixed, GpsNotFixed } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems={"center"}>
          <Grid item xs={12} sm={6}>
            <Typography className="footer-text" variant="h6" color="text.primary" gutterBottom>
              Acerca
            </Typography>
            <br />
            <Typography className="footer-text" variant="body2" color="text.secondary">
              Alunos de Tecnologias de Informação<p/>Realizaram este projeto no âmbito da unidade curricular
              <p/>  
                <Link href="https://elearning.ua.pt/course/view.php?id=718" color="inherit" className="github-icon"> 
                    <GpsFixed />
                </Link>
                <span className="footer-sig-name">Sistemas de Informação Geográfica.</span>
                <Link href="https://elearning.ua.pt/course/view.php?id=718" color="inherit" className="github-icon"> 
                    <GpsNotFixed />
                </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className="footer-text" variant="h6" color="text.primary" gutterBottom>
              Contactos
            </Typography>
            <br />
            <Typography className="footer-text" variant="body2" color="text.secondary">
              Ivan Xavier - ivanxavier@ua.pt
              <Link className="github-icon" href="https://github.com/ivanxavier7/" color="inherit">
                <GitHub />
              </Link>
              <p/>
            </Typography>
            <Typography className="footer-text" variant="body2" color="text.secondary">
              Tomás Rosa - tomasrosa@ua.pt
                <Link href="https://github.com/TomasRosaDev/" color="inherit" className="github-icon"> 
                    <GitHub />
                </Link>
              <p/>
            </Typography>
            <Typography className="footer-text" variant="body2" color="text.secondary">
              João Coelho - jffc@ua.pt
                <Link
                    href="https://github.com/draganoid16/"
                    color="inherit"
                    sx={{ pl: 1, pr: 1 }}
                    className="github-icon"
                >
                    <GitHub />
                </Link>
              <p/>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography className="footer-text " variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://localhost.com/3000" className="copyrights-ua">
              Estágios UA
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}