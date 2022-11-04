import React, { useEffect, useState } from "react";
import { Stats } from "../../components/Stats";
import { Rooms } from "../../components/Rooms";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_API } from "../../const";
import { Game } from "../../types/types";

const fetchGame = async (token: string) => {
  try {
    const response = await axios.get(BACKEND_API + "api/game/current/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
async function startNewGame(token: string) {
  try {
    const response = await axios.post(
      BACKEND_API + "api/game/new/",
      { player: "x" },
      {
        headers: {
          Authorization: "Token " + token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
const MainPage = () => {
  const { userToken } = useSelector((state: RootState) => state.user);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [game, setGame] = useState<null | Game>();
  useEffect(() => {
    if (userToken) {
      fetchGame(userToken).then((res) => setGame(res?.data[0]));
    }
  }, [userToken]);

  const navigate = useNavigate();

  const startGame = () => {
    if (userToken) {
      startNewGame(userToken).then((res) => {
        const id = res?.data.id;
        navigate("/game/" + id);
      });
    }
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
      <Typography
        variant="h5"
        component="span"
        sx={{ textAlign: "center", p: 4 }}
      >
        {" You are logged as " + userInfo?.username || "..."}
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
        {!game ? (
          <Button
            variant="contained"
            sx={{ m: "auto", mb: 10 }}
            onClick={startGame}
          >
            New game
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ m: "auto", mb: 10 }}
            onClick={() => navigate("/game/" + game.id)}
          >
            Back to game
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MainPage;
