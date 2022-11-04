import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { BACKEND_API } from "../../const";
import { UserStats } from "../../types/types";

async function fetchData(token: string) {
  try {
    const response = await axios.get(BACKEND_API + "api/game/stats/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
const Stats = () => {
  const { userToken } = useSelector((state: RootState) => state.user);
  const [stats, setStats] = useState<null | UserStats>();
  useEffect(() => {
    if (userToken) {
      fetchData(userToken).then((res) => setStats(res?.data));
    }
  }, [userToken]);
  const navigate = useNavigate();

  const goToRanking = () => {
    navigate("/result");
  };
  return (
    <Box sx={{ m: "auto", mt: 0, p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ pb: 2 }}>
        Statistics
      </Typography>
      <Typography sx={{ pb: 2 }}>{"Win: " + stats?.win || "..."}</Typography>
      <Typography sx={{ pb: 2 }}>{"All: " + stats?.all || "..."}</Typography>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={goToRanking}
      >
        Ranking
      </Button>
    </Box>
  );
};

export default Stats;
