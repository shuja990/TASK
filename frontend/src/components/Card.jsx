import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../userActions";
import { Button, Paper, TextField } from "@mui/material";
import { deleteUser } from "../userActions";
import BasicModal from "./Modal";

export default function Cardd({ user }) {
  const { name, email, counter, image } = user;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;
  const [add, setAdd] = React.useState(0);
  const [subtract, setSubtract] = React.useState(0);
  const [openn, setOpenn] = React.useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => setOpenn(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  React.useEffect(()=>{

  },[success])
  const addValue = () => {
    let u = user;
    u.counter = counter + add;
    dispatch(updateUserProfile(u));
  };

  const subtractValue = () => {
    let u = user;
    u.counter = counter - subtract;
    dispatch(updateUserProfile(u));
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(user.id));
    }
  };
  return (
    <>
    <BasicModal open={openn} handleClose={handleClose} user={user} handleOpen={handleOpen}/>
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings" onClick={handleToggle}>
              <MoreVertIcon />
            </IconButton>
            {open && (
              <Paper>
                <MenuList>
                  <MenuItem onClick={handleOpen}>Edit</MenuItem>
                  <MenuItem onClick={deleteHandler}>Delete</MenuItem>
                </MenuList>
              </Paper>
            )}
          </>
        }
      />
      <CardMedia component="img" height="80" style={{objectFit:"contain"}} image={`http://localhost:5000${image}`} alt={name} />
      <CardContent>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "center" }}
        >
          {counter}
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ margin: "5px" }}>
            <Button
              variant="contained"
              style={{ margin: "2px", width: "100%" }}
              onClick={addValue}
            >
              Add
            </Button>{" "}
            <TextField
              style={{ margin: "2px" }}
              value={add}
              onChange={(e) => setAdd(e.target.value)}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          </div>
          <div style={{ margin: "5px" }}>
            <Button
              variant="contained"
              style={{ margin: "2px", width: "100%" }}
              color="error"
              onClick={subtractValue}
            >
              Delete
            </Button>
            <TextField
              value={subtract}
              onChange={(e) => setSubtract(e.target.value)}
              style={{ margin: "2px" }}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}
