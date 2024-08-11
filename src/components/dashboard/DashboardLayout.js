import React from "react";
import AuthGuard from "./AuthGuard";
import { Button, Stack, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { userLogout } from "@/redux/slicers/user";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();

  function logout() {
    dispatch(userLogout());
  }

  return (
    <AuthGuard>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        padding={1}
        sx={{
          backgroundColor: "#546E7A",
        }}
      >
        <Button onClick={logout}>
          <Tooltip title="Logout">
            <Icon icon={"ic:baseline-logout"} fontSize={"20px"} color="white" />
          </Tooltip>
        </Button>
      </Stack>
      {children}
    </AuthGuard>
  );
}

export default DashboardLayout;
