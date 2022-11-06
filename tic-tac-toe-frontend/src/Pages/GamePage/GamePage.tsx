import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Game } from "../../types/types";
import axios from "axios";
import { BACKEND_API } from "../../const";
import { Board } from "../../components/Board";
import { useNavigate, useParams } from "react-router";
import { Button, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fetchGame = async (token: string, gameId: string) => {
  try {
    const response = await axios.get(
      BACKEND_API + "api/game/details/" + gameId + "/",
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
};

const updateBoard = async (fieldNum: number, token: string) => {
  try {
    const response = await axios.put(
      BACKEND_API + "api/game/current/",
      {
        fieldNum,
      },
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
};
const GamePage = () => {
  const { userToken, userInfo } = useSelector((state: RootState) => state.user);
  const params = useParams();
  const [game, setGame] = useState<null | Game>();
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (userToken) {
      interval = setInterval(() => {
        fetchGame(userToken, params.gameid || "").then((res) =>
          setGame(res?.data)
        );
      }, 3000);
    }
    return () => {
      if (!!interval) {
        clearInterval(interval);
      }
    };
  }, [userToken, params.gameid]);

  useEffect(() => {
    if (userToken) {
      fetchGame(userToken, params.gameid || "").then((res) =>
        setGame(res?.data)
      );
    }
  }, [userToken, params.gameid]);

  const makeMove = useCallback(
    (fieldNum: number) => {
      if (userToken) {
        updateBoard(fieldNum, userToken).then(() =>
          fetchGame(userToken, params.gameid || "").then((res) =>
            setGame(res?.data)
          )
        );
      }
    },
    [userToken, params.gameid]
  );

  if (!game || !userInfo) return null;

  const playersTurn =
    (game?.board.match(/x/g) || []).length <=
    (game?.board.match(/o/g) || []).length
      ? "x"
      : "o";

  return (
    <>
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
        {game.status === "INPLAY" && (
          <>
            <Typography sx={{ textAlign: "center", p: 1 }}>
              {"You are playing: " +
                (game?.player_x_name !== userInfo?.username ? "o" : "x")}
            </Typography>
            <Typography sx={{ textAlign: "center", p: 1 }}>
              {"Now is playing " + playersTurn}
            </Typography>
          </>
        )}
        {game.status === "WAITING" && (
          <Typography sx={{ textAlign: "center", p: 4 }}>
            Waiting for another player
          </Typography>
        )}
        {(game.status === "INPLAY" || game.status === "FINISHED") && (
          <Board
            board={game.board}
            player_x={game.player_x}
            player_o={game.player_o}
            makeMove={makeMove}
          />
        )}
      </Box>

      <Modal
        open={game.status === "FINISHED"}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game over
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {game.winner === userInfo.id
              ? "You won!"
              : !game.winner
              ? "Tie"
              : "You lost"}
          </Typography>
          <Button onClick={goToMenu}>Go to menu</Button>
        </Box>
      </Modal>
    </>
  );
};

export default GamePage;
