import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Commit from "./components/Commit/Commit";

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
      <h1>Commits</h1>
      <div>
        {commits.length > 0 &&
          commits.map((commit) => {
            return <Commit key={commit.node_id} data={commit} />;
          })}
      </div>
    </>
  );
}

export default App;
