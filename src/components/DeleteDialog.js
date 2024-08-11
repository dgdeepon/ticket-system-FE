import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket } from "@/redux/slicers/ticket";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

export default function DeleteDialog({ id, getTickets }) {
  const [open, setOpen] = React.useState(false);
  const { isLoading } = useSelector((store) => store.ticket);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteNow() {
    const response = await dispatch(deleteTicket({ id: id }));
    if (response?.status == 200) {
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      getTickets();
    } else {
      enqueueSnackbar("Failed to delete the ticket.", {
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
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Icon icon={"material-symbols:delete-outline"} color="red" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this Ticket ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            autoFocus
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            sx={{
              backgroundColor: "red",
            }}
            onClick={deleteNow}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
