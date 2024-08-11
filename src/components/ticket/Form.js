import {
  addComment,
  createTicket,
  getTicketDetails,
  updateTicket,
} from "@/redux/slicers/ticket";
import { category, priority, status } from "@/utils/fixedValue";
import { ALL_PATHS } from "@/utils/path";
import { loggedUser } from "@/utils/token";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Form({ id }) {
  const [ticketDetails, setTicketDetails] = useState({
    id: "",
    title: "",
    description: "",
    status: "new",
    category: "support",
    priority: "low",
    assignTo: "",
    assignedOrganization: "",
    comments: [],
  });
  const [assignedPerson, setAssignedPerson] = useState({});
  const [message, setMessage] = useState("");
  const userDetails = loggedUser.getDetails();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();
  const { organizationList, isLoading } = useSelector((store) => store.ticket);

  function handleChange(e) {
    if (e.target.name == "assignedOrganization") {
      const assignPerson = organizationList.find(
        (el) => el.id == e.target.value
      ).user;
      setTicketDetails({
        ...ticketDetails,
        [e.target.name]: e.target.value,
        assignTo: assignPerson.id,
      });
      setAssignedPerson(assignPerson);
    } else {
      setTicketDetails({ ...ticketDetails, [e.target.name]: e.target.value });
    }
  }

  function handleClose() {
    router.push(ALL_PATHS.dashboard);
  }

  async function handleSubmit() {
    if (!id) {
      delete ticketDetails.id;
      delete ticketDetails.comments;
    }
    let response;
    if (id) {
      response = await dispatch(updateTicket({ data: ticketDetails, id }));
    } else {
      response = await dispatch(createTicket(ticketDetails));
    }
    if (response?.status == 201) {
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      if (!id) {
        router.push(ALL_PATHS.dashboard);
      }
    } else if (response?.status == 200) {
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      singleTicketDetails(id);
    } else {
      enqueueSnackbar(response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  async function singleTicketDetails(id) {
    const response = await dispatch(getTicketDetails({ id }));
    if (response?.status == 200) {
      const data = response.data.ticket;
      const assignPerson = organizationList.find(
        (el) => el.id == data.assignedOrganization
      ).user;
      setTicketDetails({
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        assignedOrganization: data.assignedOrganization,
        assignTo: data.assignTo,
        comments: data.ticket_comments,
        status: data.status,
      });

      setAssignedPerson(assignPerson);
    } else {
      enqueueSnackbar(response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  async function postComment() {
    if (!message || !userDetails || !id) {
      return;
    }

    const response = await dispatch(
      addComment({ message: message, senderId: userDetails.id, ticketId: id })
    );
    if (response?.status == 201) {
      setTicketDetails({
        ...ticketDetails,
        comments: [
          ...ticketDetails.comments,
          {
            id: ticketDetails.comments.length + 1,
            message: message,
            senderId: userDetails.id,
            ticketId: id,
          },
        ],
      });
      setMessage("");
    }
  }

  useEffect(() => {
    if (!id && organizationList?.length) {
      const assignPerson = organizationList[0].user;
      setTicketDetails({
        ...ticketDetails,
        assignedOrganization: organizationList[0].id,
        assignTo: assignPerson.id,
      });
      setAssignedPerson(assignPerson);
    } else if (id) {
      singleTicketDetails(id);
    }
  }, [id]);

  const isDisable = id && userDetails.role == "admin" ? true : false;

  return (
    <Grid container>
      <Grid item xs={12} lg={6} padding={2}>
        <Box>
          <Typography>Title</Typography>
          <TextField
            disabled={id}
            size="small"
            fullWidth
            value={ticketDetails.title}
            name="title"
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </Box>

        <Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Box>
              <Typography>Priority</Typography>
              <Select
                disabled={isDisable ? false : !id ? false : true}
                value={ticketDetails.priority}
                size="small"
                name="priority"
                onChange={handleChange}
              >
                {priority.map((el) => (
                  <MenuItem value={el.value} key={el.label}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>{" "}
            <Box>
              <Typography>Category</Typography>
              <Select
                disabled={isDisable ? false : !id ? false : true}
                value={ticketDetails.category}
                size="small"
                name="category"
                onChange={handleChange}
              >
                {category.map((el) => (
                  <MenuItem value={el.value} key={el.label}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {organizationList?.length ? (
              <>
                <Box>
                  <Typography>Select Organization</Typography>
                  <Select
                    disabled={id}
                    value={ticketDetails.assignedOrganization}
                    size="small"
                    name="assignedOrganization"
                    onChange={handleChange}
                  >
                    {organizationList.map((el) => (
                      <MenuItem value={el.id} key={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Typography>Assign To</Typography>
                  <TextField
                    size="small"
                    value={assignedPerson.name}
                    disabled={true}
                  />
                </Box>
              </>
            ) : (
              ""
            )}
            {isDisable ? (
              <Box>
                <Typography>Status</Typography>
                <Select
                  value={ticketDetails.status}
                  size="small"
                  name="status"
                  onChange={handleChange}
                >
                  {status.map((el, i) => (
                    <MenuItem
                      value={el.value}
                      disabled={
                        status[i + 1]?.value == ticketDetails?.status
                          ? false
                          : status[i - 1]?.value == ticketDetails?.status
                          ? false
                          : status[i]?.value == ticketDetails?.status
                          ? false
                          : true
                      }
                      key={el.label}
                    >
                      {el.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            ) : (
              ""
            )}
          </Stack>
        </Box>

        <Box>
          <Typography>Description</Typography>
          <TextareaAutosize
            disabled={id}
            style={{
              width: "100%",
              height: "50%",
            }}
            placeholder="Enter Description"
            name="description"
            onChange={handleChange}
            value={ticketDetails.description}
          />
        </Box>
        <Box>
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button variant="outlined" size="small" onClick={handleClose}>
              Back
            </Button>
            {isDisable || !id ? (
              <LoadingButton
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#546E7A",
                }}
                loading={isLoading}
                disabled={
                  !ticketDetails.title ||
                  !ticketDetails.description ||
                  !ticketDetails.assignedOrganization ||
                  !ticketDetails.category ||
                  !ticketDetails.priority
                }
                onClick={handleSubmit}
              >
                {isDisable ? "Update" : "Submit"}
              </LoadingButton>
            ) : (
              ""
            )}
          </Stack>
        </Box>
      </Grid>

      {id ? (
        <Grid item xs={12} lg={6} padding={2}>
          <Stack
            justifyContent={"space-between"}
            height={"550px"}
            boxShadow={
              "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
            }
            padding={2}
          >
            <Box height={"90%"} overflow={"auto"}>
              {ticketDetails?.comments?.length
                ? ticketDetails.comments.map((el, i) => (
                    <Stack
                      key={i}
                      direction="row"
                      justifyContent={
                        el.senderId == userDetails.id
                          ? "flex-end"
                          : "flex-start"
                      }
                    >
                      <Typography
                        m={1}
                        width={"50%"}
                        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
                        overflow={"auto"}
                        padding={1}
                        sx={{
                          backgroundColor:
                            el.senderId == userDetails.id
                              ? "#B3E5FC"
                              : "#C8E6C9",
                          borderRadius: "10px",
                        }}
                      >
                        {el.message}
                      </Typography>
                    </Stack>
                  ))
                : ""}
            </Box>
            <Box height={"10%"}>
              <TextField
                value={message}
                size="small"
                fullWidth
                placeholder="Write your comments here..."
                onChange={handleMessage}
                InputProps={{
                  endAdornment: (
                    <LoadingButton loading={isLoading} onClick={postComment}>
                      <Icon
                        icon={"material-symbols:send-outline"}
                        fontSize={"25px"}
                      />
                    </LoadingButton>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}
