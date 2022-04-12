import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextField } from "@mui/material";
import { Input } from "@mui/material";
import { FormGroup } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../userActions";
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
  const [name, setName] = React.useState(user.name);
  const [uploading, setUploading] = React.useState(false);
  const [image, setImage] = React.useState(user.image);
  const dispatch = useDispatch();
  const userUpdate = useSelector((state) => state.userDelete);

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
    let u = user;
    u.name = name
    u.image = image
    console.log(name);
    let a = {
        name : name,
        image : image,
        counter: user.counter,
        email:user.email
    }
    dispatch(updateUserProfile(a));
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
            <FormGroup style={{ margin: "5px" }}>
              <TextField
                //   required
                id="outlined-required"
                label="Required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup style={{ margin: "5px" }}>
              <Input type="file" onChange={uploadFileHandler}></Input>

              {uploading && <CircularProgress />}
            </FormGroup>
            <Button type="submit">Update</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
