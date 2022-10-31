import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const Stats = () => {
  return (
    <Box sx={{ m: "auto", mt: 0, p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ pb: 2 }}>
        Statistics
      </Typography>
      <Typography sx={{ pb: 2 }}>Win:</Typography>
      <Typography sx={{ pb: 2 }}>Lose:</Typography>
      <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
        Ranking
      </Button>
    </Box>
  );
};

export default Stats;
