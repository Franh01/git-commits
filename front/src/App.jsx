import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Commit from "./components/Commit/Commit";
import {
  Alert,
  Box,
  Divider,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [commits, setCommits] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackError, setSnackError] = useState("");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/commits")
      .then((res) => {
        setCommits(res.data.commits);
        setIsLoading(false);
      })
      .catch((err) => {
        setSnackError(err.message);
        setOpenSnack(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          variant="filled"
          elevation={6}
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackError}
        </Alert>
      </Snackbar>
      <Typography component={"h1"} fontSize={"22px"} mb={"30px"}>
        Commits
      </Typography>
      <Box
        sx={{
          borderRadius: "4px",
          border: "1px solid #5b5b5b",
          padding: "8px 6px",
        }}
      >
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        {commits.length > 0 &&
          commits.map((commit) => {
            return (
              <Box key={commit.node_id}>
                <Commit data={commit} />
                <Divider
                  sx={{
                    background: "#5b5b5b",
                  }}
                />
              </Box>
            );
          })}
      </Box>
    </>
  );
}

export default App;
