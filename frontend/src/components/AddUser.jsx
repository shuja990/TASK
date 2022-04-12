import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextField } from "@mui/material";
import { Input } from "@mui/material";
import { FormGroup } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../userActions";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleOpen, handleClose, user }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [uploading, setUploading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const dispatch = useDispatch();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios.post(`/upload`, formData);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const updateProfile = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, 0, image));
    handleClose()
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={updateProfile}>
            <FormGroup style={{ margin: "10px" }}>
              <TextField
                required
                id="outlined-required"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup style={{ margin: "10px" }}>
              <TextField
                required
                type="email"
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup style={{ margin: "10px" }}>
              <TextField
                required
                type="password"
                id="outlined-required"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup style={{ margin: "10px" }}>
              <Input type="file" onChange={uploadFileHandler}></Input>

              {uploading && <CircularProgress />}
            </FormGroup>
            <Button type="submit">Add User</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
