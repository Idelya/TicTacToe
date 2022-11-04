import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserAuthData, UserLoginData } from "../../types/types";
import { loginUser } from "../../features/user/userActions";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store/store";

const LoginForm = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  console.log(userInfo);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values: UserLoginData) => {
      submitForm(values);
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const submitForm = (data: UserLoginData) => {
    // @ts-ignore
    dispatch(loginUser(data));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          <TextField
            required
            id="username"
            label="Login"
            sx={{ m: 2 }}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            sx={{ m: 2 }}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button type="submit">Login</Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
