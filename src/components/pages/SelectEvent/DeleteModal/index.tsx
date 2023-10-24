import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (decision: boolean) => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  setOpen,
  onDelete,
}) => {
  const handleDelete = (decision: boolean) => {
    setOpen(false);
    onDelete(decision);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Event Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(true)} autoFocus>
            Yes
          </Button>
          <Button onClick={() => handleDelete(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
