import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Game } from "../../types/types";
import axios from "axios";
import { BACKEND_API } from "../../const";

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
const GamePage = () => {
  const { userToken, userInfo } = useSelector((state: RootState) => state.user);
  console.log(userToken);
  const [game, setGame] = useState<null | Game>();
  useEffect(() => {
    if (userToken) {
      fetchGame(userToken).then((res) => setGame(res?.data[0]));
    }
  }, [userToken]);
  console.log(game);
  if (!game || !userInfo) return null;

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
        {"You are playing: " +
          (game?.player_x_name !== userInfo?.username ? "x" : "o")}
      </Typography>
      {game.status === "WAITING" && (
        <Typography sx={{ textAlign: "center", p: 4 }}>
          Waiting for another player
        </Typography>
      )}
    </Box>
  );
};

export default GamePage;
