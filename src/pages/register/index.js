import { userRegister } from "@/redux/slicers/user";
import { ALL_PATHS } from "@/utils/path";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const fields = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter Name",
  },
  {
    label: "email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    label: "password",
    type: "password",
    placeholder: "Enter Password",
  },
];

const organizationFields = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter Organization Name",
  },
];

const roleOptions = [
  {
    label: "User",
    value: "user",
  },
  // {
  //   label: "Agent",
  //   value: "agent",
  // },
  {
    label: "Admin",
    value: "admin",
  },
];

function index() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    organization: {
      name: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);
  const router = useRouter();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleOrganization(e) {
    setInput({
      ...input,
      organization: { ...input.organization, [e.target.name]: e.target.value },
    });
  }

  async function handleSubmit() {
    const response = await dispatch(userRegister(input));
    if (response?.status == 201) {
      enqueueSnackbar("Successfully logged in.", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      router.push(ALL_PATHS.root);
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
          Sign Up
        </Typography>
        {fields.map((el) => (
          <TextField
            key={el.label}
            placeholder={el.placeholder}
            name={el.label}
            value={input[el.label]}
            type={el.label == "password" && showPassword ? "text" : el.type}
            onChange={handleChange}
            InputProps={
              el.label == "password"
                ? {
                    endAdornment: showPassword ? (
                      <Button
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        <Icon icon={"iconamoon:eye-off-light"} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        <Icon icon={"iconoir:eye"} />
                      </Button>
                    ),
                  }
                : {}
            }
          />
        ))}
        <Select value={input.role} name="role" onChange={handleChange}>
          {roleOptions.map((el) => (
            <MenuItem value={el.value} key={el.value}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
        {input.role == "admin"
          ? organizationFields.map((el, i) => (
              <TextField
                value={input.organization[el.label]}
                name={el.label}
                onChange={handleOrganization}
                placeholder={el.placeholder}
                key={i}
              />
            ))
          : ""}
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
          disabled={!input.email || !input.password || !input.name}
        >
          Sign Up
        </LoadingButton>
        <Link
          href={ALL_PATHS.root}
          style={{
            textDecoration: "none",
          }}
        >
          Already have an account? Sign in
        </Link>
      </Stack>
    </Stack>
  );
}

export default index;
