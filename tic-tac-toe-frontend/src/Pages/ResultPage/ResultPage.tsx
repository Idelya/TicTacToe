import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API } from "../../const";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Rank } from "../../components/Rank";

const fetchRank = async (token: string) => {
  try {
    const response = await axios.get(BACKEND_API + "api/ranks/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const ResultPage = () => {
  const { userToken, userInfo } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    if (userToken) {
      fetchRank(userToken).then((res) => {
        const sorted = res?.data;
        sorted.sort((a: any, b: any) => b.win - a.win);
        console.log(sorted);
        setRanks(sorted);
      });
    }
  }, [userToken]);
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
      <Rank users={ranks} />
      <Button variant="outlined" color="secondary" onClick={goToMenu}>
        Back to menu
      </Button>
    </Box>
  );
};

export default ResultPage;
