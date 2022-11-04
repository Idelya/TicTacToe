import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../../features/user/userActions";
import { RootState } from "../../store/store";
import { UserAuthData } from "../../types/types";
import { useFormik } from "formik";

const RegisterForm = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values: UserAuthData) => {
      submitForm(values);
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const submitForm = (data: UserAuthData) => {
    if (data.password !== data.repeatPassword) {
      alert("Password mismatch");
      return;
    }
    // @ts-ignore
    dispatch(registerUser(data));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          <TextField
            id="username"
            label="Login"
            onChange={formik.handleChange}
            value={formik.values.username}
            sx={{ m: 2 }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            sx={{ m: 2 }}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <TextField
            id="repeatPassword"
            label="Repeat password"
            type="password"
            sx={{ m: 2 }}
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
          />
          <Button type="submit">Register</Button>
        </Box>
      </form>
    </div>
  );
};

export default RegisterForm;
