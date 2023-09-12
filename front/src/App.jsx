import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Commit from "./components/Commit/Commit";
import { Box, Typography } from "@mui/material";

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
      <Typography component={"h1"} fontSize={"22px"}>
        Commits
      </Typography>
      <Box>
        {commits.length > 0 &&
          commits.map((commit) => {
            return <Commit key={commit.node_id} data={commit} />;
          })}
      </Box>
    </>
  );
}

export default App;
