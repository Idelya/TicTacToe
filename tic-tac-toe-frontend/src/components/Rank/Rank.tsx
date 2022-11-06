import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Game, RankStats } from "../../types/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "username", headerName: "User", width: 130 },
  {
    field: "win",
    headerName: "Win",
    type: "number",
    width: 90,
  },
  {
    field: "tie",
    headerName: "Tie",
    type: "number",
    width: 90,
  },
  {
    field: "all",
    headerName: "All",
    type: "number",
    width: 90,
  },
];

interface RankProps {
  users: RankStats[];
}
const Rank = ({ users }: RankProps) => {
  console.log(users);
  return (
    <Box sx={{ m: "auto", height: 400, width: "100%", mt: 0, p: 3 }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default Rank;
