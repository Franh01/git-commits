import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Commit from "./components/Commit/Commit";
import { Box, Divider, Typography } from "@mui/material";

function App() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/commits")
      .then((res) => {
        setCommits(res.data.commits);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <Typography component={"h1"} fontSize={"22px"} mb={"30px"}>
        Commits
      </Typography>
      <Box>
        {commits.length > 0 &&
          commits.map((commit) => {
            return (
              <Box key={commit.node_id}>
                <Commit data={commit} />
                <Divider
                  sx={{
                    background: "#9e9d9d",
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
