const localStorage = require("localStorage");

export const loginToken = {
  setToken(value) {
    if (value) {
      localStorage.setItem("userToken", value);
    }
  },
  getToken() {
    return localStorage.getItem("userToken");
  },
  removeToken() {
    localStorage.removeItem("userToken");
  },
};

export const loggedUser = {
  setDetails(value) {
    if (value) {
      const data = typeof window !== undefined ? JSON.stringify(value) : "";
      localStorage.setItem("userDetails", data);
    }
  },
  getDetails() {
    return typeof window !== undefined
      ? JSON.parse(localStorage.getItem("userDetails"))
      : "";
  },
  removeDetails() {
    localStorage.removeItem("userDetails");
  },
};
