import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const GamePage = () => {
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
      <Typography sx={{ textAlign: "center", p: 4 }}>
        You are playing:
      </Typography>
    </Box>
  );
};

export default GamePage;
