import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TaskForm from "./TaskForm";
import ClearIcon from "@mui/icons-material/Clear";
import BasicCard from "./Card";
import { getTasks, deleteTask } from "./api/GlobalApi";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { format } from "date-fns";
import { UserContext } from "./context/ContextProvider";

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

function Home(props) {
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [heading, setHeading] = useState("All Task");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [expandedItems, setExpandedItems] = useState({}); // Object to manage toggle state
  const [expandedItemsText, setExpandedItemsText] = useState({}); // Object to manage toggle state
  const [arrowIcon, setArrowIcon] = useState(false); // State to manage arrow icon toggle

  const {
    setTitle,
    id,
    setID,
    setDescription,
    setIsCompleted,
    setIsImportant,
    setUpdate,
  } = useContext(UserContext);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index, heading) => {
    setSelectedIndex(index);
    setHeading(heading);
    switch (heading) {
      case "All task":
        setFilter("");
        break;
      case "Important tasks":
        setFilter("important");
        break;
      case "Completed tasks":
        setFilter("completed");
        break;
      case "Uncompleted tasks":
        setFilter("uncompleted");
        break;
      default:
        setFilter("");
        break;
    }
  };
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      if (filter === "important") {
        setTasks(response.filter((task) => task.isImportant));
      } else if (filter === "completed") {
        setTasks(response.filter((task) => task.isCompleted));
      } else if (filter === "uncompleted") {
        setTasks(response.filter((task) => !task.isCompleted));
      } else {
        setTasks(response);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (task) => {
    console.log("Update task:", task);
  };

  const handleTaskList = () => setArrowIcon(!arrowIcon);

  const handleItemClick = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    setExpandedItemsText((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handlelistEdit=(task)=>{
    console.log(task);
    
    handleClickOpen()
    setUpdate(true);
    setTitle(task?.title);
    setDescription(task?.description);
    setIsCompleted(task?.isCompleted);
    setIsImportant(task?.priority);
    setID(task._id);
  }

  const drawer = (
    <div>
      <Toolbar className="flex flex-col gap-2 my-2">
        <Typography
          className="text-center"
          variant="h5">
          To-do list
        </Typography>
        <Button
          className="w-full"
          variant="contained"
          onClick={handleClickOpen}>
          Add Task
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {[
          "All task",
          "Important tasks",
          "Completed tasks",
          "Uncompleted tasks",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleListItemClick(index, text)}
            className={
              selectedIndex === index ? "bg-[#9667e8] text-white" : ""
            }>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem
          className="bg-[#9667e8] text-white cursor-pointer"
          onClick={handleTaskList}>
          <ListItemText primary="Task List" />
          {arrowIcon ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </ListItem>
        {!arrowIcon && (
          <>
            {tasks.map((task, i) => (
              <ListItem
                key={task._id}
                onClick={() => handleItemClick(i)}
                className={`${
                  task.isCompleted ? "bg-[#FF964A]" : "bg-slate-200"
                } text-black cursor-pointer mt-2 flex flex-col`}>
                <div className="flex w-full justify-between">
                  <ListItemText primary={task.title} />
                  {expandedItems[i] ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </div>
                {expandedItemsText[i] && (
                  <>
                    <div className="bg-white rounded-md text-black p-2">
                      <p className="border-b-2"> {formatDate(task?.date)}</p>
                      <p> {task?.description}</p>
                    </div>
                    <Button
                      className="mt-5"
                      variant="contained"
                      onClick={()=>handlelistEdit(task)}
                    >Edit</Button>
                  </>
                )}
              </ListItem>
            ))}
          </>
        )}
      </List>
    </div>
  );

  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div">
            {heading}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {tasks.map((task) => (
            <BasicCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              handleClickOpen={handleClickOpen}
            />
          ))}
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle className="flex justify-between">
            <Typography variant="h6">Add Task</Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TaskForm
                handleClose={handleClose}
                fetchTasks={fetchTasks}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;
