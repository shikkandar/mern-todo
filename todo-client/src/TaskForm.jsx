import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTask, updateTask } from "./api/GlobalApi";
import { UserContext } from "./context/ContextProvider";

const TaskForm = ({ handleClose, fetchTasks}) => {
  const {
    title,
    setTitle,
    date,
    setDate,
    description,
    setDescription,
    isCompleted,
    setIsCompleted,
    isImportant,
    setIsImportant,
    update,
    id,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title && description && isImportant !== undefined) {
      try {
        await createTask({ title, date, description, isCompleted, isImportant });
        fetchTasks(); // Fetch tasks after creation
        handleClose(); // Close form if creation is successful
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const handleUpdate = async () => {
    if (title && description && isImportant !== undefined) {
      try {
        await updateTask(id, {
          title,
          description,
          isCompleted,
          isImportant,
        });

        handleClose(); // Close form if update is successful
        window.location.reload();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {!update && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                required
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <RadioGroup
          aria-labelledby="priority-label"
          value={isImportant}
          onChange={(e) => setIsImportant(e.target.value === "true")}
          required
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Mark as important"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Not important"
          />
        </RadioGroup>
        <RadioGroup
          aria-labelledby="completed-label"
          value={isCompleted}
          onChange={(e) => setIsCompleted(e.target.value === "true")}
          required
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Mark as completed"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Not completed"
          />
        </RadioGroup>
        {update ? (
          <Button
            type="button"
            variant="contained"
            color="warning"
            onClick={handleUpdate}
          >
            Update Task
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        )}
      </Box>
    </div>
  );
};

export default TaskForm;
