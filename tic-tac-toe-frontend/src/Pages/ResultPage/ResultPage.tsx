import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", p: 4 }}
      >
        Ranking of all players
      </Typography>
      <Typography sx={{ textAlign: "center", p: 4 }}>
        You are on x place
      </Typography>
      <Button variant="outlined" color="secondary" onClick={goToMenu}>
        Back to menu
      </Button>
    </Box>
  );
};

export default ResultPage;
