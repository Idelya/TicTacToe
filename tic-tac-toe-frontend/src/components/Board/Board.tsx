import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import FieldWrapper from "./FieldWrapper";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
//@ts-ignore
import circleSrc from "../../static/circleGradient.png";
//@ts-ignore
import crossSrc from "../../static/crossGradient.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface BoardProps {
  board: string;
  player_x: number;
  player_o: number;
  makeMove: (fieldNum: number) => void;
}

const Board = ({ board, player_x, player_o, makeMove }: BoardProps) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const playersTurnId =
    (board.match(/x/g) || []).length <= (board.match(/o/g) || []).length
      ? player_x
      : player_o;
  console.log(player_x, player_o, playersTurnId, userInfo);
  return (
    <Grid
      container
      sx={{
        height: "500px",
        width: "500px",
        background: "#646464",
        boxShadow:
          "0px 2px 1px 1px rgb(0 0 0 / 20%) inset, 0px 1px 1px 0px rgb(0 0 0 / 14%) inset, 0px 1px 3px 0px rgb(0 0 0 / 12%) inset",
      }}
    >
      {board.split("").map((field, i) => (
        <FieldWrapper
          active={field === "_" && playersTurnId === userInfo?.id}
          fieldId={i}
          makeMove={makeMove}
        >
          {field !== "_" ? (
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", p: 2 }}
              image={field === "x" ? crossSrc : circleSrc}
              alt={field === "x" ? "cross" : "circle"}
            />
          ) : (
            <Box sx={{ height: "100%" }} />
          )}
        </FieldWrapper>
      ))}
    </Grid>
  );
};

export default Board;
