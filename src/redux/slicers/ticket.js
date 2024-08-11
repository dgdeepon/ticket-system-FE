import { loginToken } from "@/utils/token";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

export const ticket = createSlice({
  name: "ticket",
  initialState: {
    isLoading: false,
    isError: false,
    organizationList: [],
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload ?? false;
    },
    setError(state, action) {
      state.isError = action.payload ?? false;
      state.isLoading = false;
    },
    setOrganizationList(state, action) {
      state.organizationList = action.payload ?? [];
    },
  },
});

export default ticket.reducer;

// get ticket list
export const getAllTickets = () => async (dispatch) => {
  try {
    dispatch(ticket.actions.setLoading(true));
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/tickets`, {
      headers: {
        Authorization: `Bearer ${loginToken.getToken()}`,
      },
    });
    dispatch(ticket.actions.setLoading());
    return response;
  } catch (error) {
    dispatch(ticket.actions.setError(true));
  }
};

// get ticket  details
export const getTicketDetails =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(ticket.actions.setLoading(true));
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken.getToken()}`,
          },
        }
      );
      dispatch(ticket.actions.setLoading());

      return response;
    } catch (error) {
      dispatch(ticket.actions.setError(true));
    }
  };

// create ticket
export const createTicket = (data) => async (dispatch) => {
  try {
    dispatch(ticket.actions.setLoading(true));
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/tickets/add-ticket`,
      data,
      {
        headers: {
          Authorization: `Bearer ${loginToken.getToken()}`,
        },
      }
    );
    dispatch(ticket.actions.setLoading());
    return response;
  } catch (error) {
    dispatch(ticket.actions.setError(true));
  }
};

// update ticket
export const updateTicket =
  ({ data, id }) =>
  async (dispatch) => {
    try {
      dispatch(ticket.actions.setLoading(true));
      delete data.id;
      delete data.comments;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/tickets/update-ticket/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${loginToken.getToken()}`,
          },
        }
      );
      dispatch(ticket.actions.setLoading());
      return response;
    } catch (error) {
      dispatch(ticket.actions.setError(true));
    }
  };

// delete ticket
export const deleteTicket =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(ticket.actions.setLoading(true));
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/tickets/delete-ticket/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken.getToken()}`,
          },
        }
      );
      dispatch(ticket.actions.setLoading());
      return response;
    } catch (error) {
      dispatch(ticket.actions.setError(true));
    }
  };

// add comments
export const addComment = (data) => async (dispatch) => {
  try {
    dispatch(ticket.actions.setLoading(true));
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/comments/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${loginToken.getToken()}`,
        },
      }
    );
    dispatch(ticket.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(ticket.actions.setError(true));
  }
};

// get organization list
export const getOrganizationDetails = () => async (dispatch) => {
  try {
    dispatch(ticket.actions.setLoading(true));
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/organization`,
      {
        headers: {
          Authorization: `Bearer ${loginToken.getToken()}`,
        },
      }
    );
    if (response?.status == 200) {
      dispatch(ticket.actions.setOrganizationList(response.data.organization));
    }

    dispatch(ticket.actions.setLoading());
    return response;
  } catch (error) {
    dispatch(ticket.actions.setError(true));
  }
};
