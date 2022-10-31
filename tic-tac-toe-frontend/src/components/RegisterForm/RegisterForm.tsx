import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const RegisterForm = () => {
  return (
    <div>
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          <TextField required id="login" label="Login" sx={{ m: 2 }} />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            sx={{ m: 2 }}
          />
          <Button>Register</Button>
        </Box>
      </form>
    </div>
  );
};

export default RegisterForm;
