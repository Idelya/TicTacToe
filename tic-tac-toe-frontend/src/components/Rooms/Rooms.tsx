import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Box from "@mui/material/Box";

const Rooms = () => {
  const gemeRooms = [
    { userId: "1", login: "user1" },
    { userId: "2", login: "user2" },
    { userId: "3", login: "user3" },
  ];

  return (
    <Box sx={{ m: "auto", mt: 0, p: 3 }}>
      <Typography variant="h5" component="h2">
        Find player and join the game
      </Typography>
      <List>
        {gemeRooms.map(({ userId, login }) => (
          <ListItem
            key={userId}
            secondaryAction={
              <IconButton edge="end" aria-label="join game">
                <PlayCircleIcon />
              </IconButton>
            }
          >
            <ListItemText primary={login} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Rooms;
