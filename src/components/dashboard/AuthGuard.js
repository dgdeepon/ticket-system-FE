import React, { useEffect } from "react";
import { getOrganizationDetails } from "@/redux/slicers/ticket";
import { ALL_PATHS } from "@/utils/path";
import { loginToken } from "@/utils/token";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function AuthGuard({ children }) {
  const { loginDetails } = useSelector((store) => store.user);
  const token = loginToken.getToken();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginDetails?.token && !token) {
      router.push(ALL_PATHS.root);
    } else {
      dispatch(getOrganizationDetails());
    }
  }, [loginDetails]);

  return children;
}


export default AuthGuard;
