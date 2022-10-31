import React from "react";
import { LoginForm } from "../../components/LoginForm";
import { RegisterForm } from "../../components/RegisterForm";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        maring: "auto",
      }}
    >
      <LoginForm />
      <Divider orientation="vertical" flexItem />
      <RegisterForm />
    </Box>
  );
};

export default LoginPage;
