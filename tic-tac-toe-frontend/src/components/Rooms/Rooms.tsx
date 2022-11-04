import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_API } from "../../const";
import { RootState } from "../../store/store";
import { Game } from "../../types/types";
import { useNavigate } from "react-router";

async function fetchData(token: string) {
  try {
    const response = await axios.get(BACKEND_API + "api/game/rooms/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function joinGame(token: string, gameId: number) {
  try {
    const response = await axios.put(
      BACKEND_API + "api/game/" + gameId + "/",
      {},
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
const Rooms = () => {
  const { userToken } = useSelector((state: RootState) => state.user);
  const [rooms, setRooms] = useState<Game[]>([]);
  const navigate = useNavigate();

  const getRooms = () => {
    if (userToken) {
      fetchData(userToken).then((res) => setRooms(res?.data));
    }
  };
  useEffect(() => {
    getRooms();
  }, [userToken]);

  const handleJoin = (id: number) => {
    if (userToken) {
      joinGame(userToken, id).then(() => navigate("/game/" + id));
    }
  };
  return (
    <Box sx={{ m: "auto", mt: 0, p: 3 }}>
      <div>
        <Typography variant="h5" component="h2">
          Find player and join the game
        </Typography>
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={getRooms}
        >
          <RefreshIcon />
        </IconButton>
      </div>
      <List>
        {rooms.map(({ id, player_o_name, player_x_name }) => (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="join game"
                onClick={() => handleJoin(id)}
              >
                <PlayCircleIcon />
              </IconButton>
            }
          >
            <ListItemText primary={player_o_name || player_x_name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Rooms;
