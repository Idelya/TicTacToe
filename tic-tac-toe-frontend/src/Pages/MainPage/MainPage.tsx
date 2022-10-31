import React from "react";
import { Stats } from "../../components/Stats";
import { Rooms } from "../../components/Rooms";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
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
        Tic Tac Toe
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          minHeight: "70vh",
        }}
      >
        <Stats />
        <Rooms />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          position: "fixed",
          bottom: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{ m: "auto", mb: 10 }}
          onClick={startGame}
        >
          New game
        </Button>
      </Box>
    </Box>
  );
};

export default MainPage;
