import React, { useState, FormEvent } from "react";
import {
  Button,
  TextField,
  Container,
  Dialog,
  Snackbar,
  duration,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCalendarEvent } from "../../features/Calendar/calendarSlice";
import { Navigate } from "react-router";

type AddModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    duration: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (isSnackbarOpen) {
      setIsSnackbarOpen(false);
    }
  };
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (+formData.start + +formData.duration > 540) {
      setIsSnackbarOpen(true);
      return;
    }
    console.log(formData);
    dispatch(
      createCalendarEvent({
        title: formData.title,
        userId: user!.id,
        id: Date.now(),
        start: +formData.start,
        duration: +formData.duration,
      })
    );
    onClose();
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <Container>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              name="start"
              label="Start(in minutes)"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.start}
              onChange={handleChange}
              type="number"
              inputProps={{ min: 0, max: 540 }}
            />
            <TextField
              name="duration"
              label="Duration(in minutes)"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={formData.duration}
              onChange={handleChange}
              type="number"
              inputProps={{ min: 0 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message="Number is out of range!"
              action={
                <Button
                  color="secondary"
                  size="small"
                  onClick={handleCloseSnackbar}
                >
                  Close
                </Button>
              }
            />
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

export default AddModal;
