import { userLogin } from "@/redux/slicers/user";
import { ALL_PATHS } from "@/utils/path";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
    const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    const response = await dispatch(userLogin(input));
    if (response?.status == 200) {
      enqueueSnackbar("Successfully logged in.", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      router.push(ALL_PATHS.dashboard);
    } else {
      enqueueSnackbar("Failed to login. Please try again!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      height={"100vh"}
      alignItems={"center"}
    >
      <Stack
        spacing={1}
        width={{ xs: "90%", sm: "70%", md: "40%" }}
        padding={3}
        borderRadius={"10px"}
        boxShadow={
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        }
      >
        <Typography textAlign={"center"} variant="h4">
          Login
        </Typography>
        <TextField
          placeholder="Enter Email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <TextField
          placeholder="Enter Password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleChange}
        />
        <LoadingButton
          variant="contained"
          onClick={handleLogin}
          loading={isLoading}
          disabled={!input.email || !input.password}
        >
          Login
        </LoadingButton>
        <Link
          href={ALL_PATHS.register}
          style={{
            textDecoration: "none",
          }}
        >
          Don't have an account? Sign Up
        </Link>
      </Stack>
    </Stack>
  );
}

export default LoginForm;
