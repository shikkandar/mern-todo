import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { UserContext } from "./context/ContextProvider";

export default function BasicCard({
  task,
  onDelete,
  onUpdate,
  handleClickOpen,
}) {
  const {
    setTitle,
    id,
    setID,
    setDescription,
    setIsCompleted,
    setIsImportant,
    setUpdate,
  } = React.useContext(UserContext);

  const [complete, setComplete] = React.useState(task?.isCompleted);
  const [important, setImportant] = React.useState(task?.isImportant);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task._id);
    }
  };

  const handleUpdate = () => {
    setUpdate(true);
    setTitle(task?.title);
    setDescription(task?.description);
    setIsCompleted(task?.isCompleted);
    setIsImportant(task?.priority);
    setID(task._id);

    if (onUpdate) {
      onUpdate(task);
    }

    handleClickOpen();
  };

  // Format date to dd/MM/yyyy
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent className="bg-[#7C3AED] text-white min-h-[150px]">
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          {task?.title}
        </Typography>
        <Typography variant="body2" className="text-gray-200">
          {task?.description}
          <br />
        </Typography>
        <br />
        <br />
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          {formatDate(task?.date)}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <div>
          <Button
            variant="contained"
            color={complete ? "success" : "secondary"}
            size="small"
          >
            {complete ? "Completed" : "UnCompleted"}
          </Button>
        </div>
        <div className="flex gap-2">
          {important ? (
            <StarIcon className="cursor-pointer" />
          ) : (
            <StarBorderIcon className="cursor-pointer" />
          )}
          <DeleteIcon
            className="cursor-pointer"
            onClick={handleDelete}
          />
          <EditIcon
            className="cursor-pointer"
            onClick={handleUpdate}
          />
        </div>
      </CardActions>
    </Card>
  );
}
