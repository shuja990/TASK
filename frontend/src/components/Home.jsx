import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../userActions";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import Cardd from "./Card";
import BasicModal from "./AddUser";

export default function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [openn, setOpenn] = React.useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => setOpenn(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <BasicModal
        open={openn}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ margin: "10px", width: "70%" }}
          />
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Cardd user={user} />
                </Grid>
              ))}
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ minWidth: 350 }}>
                <CardHeader></CardHeader>

                <CardContent>
                  <Button
                    variant="contained"
                    style={{ margin: "2px", width: "100%" }}
                    onClick={handleOpen}
                  >
                    Add User
                  </Button>{" "}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
