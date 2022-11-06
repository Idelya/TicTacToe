import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@material-ui/core";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface FieldWrapperProps {
  active: boolean;
  children: React.ReactNode;
  fieldId: number;
  makeMove: (fieldNum: number) => void;
}

const FieldWrapper = ({
  active,
  children,
  fieldId,
  makeMove,
}: FieldWrapperProps) => {
  return (
    <Grid item xs={4} sx={{ p: 1, height: "33.333%" }}>
      <Card sx={{ background: "#000000", minWidth: "100%", height: "100%" }}>
        {active ? (
          <CardActionArea
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            onClick={() => makeMove(fieldId)}
          >
            {children}
          </CardActionArea>
        ) : (
          children
        )}
      </Card>
    </Grid>
  );
};

export default FieldWrapper;
