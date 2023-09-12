import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

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
      <div>
        {commits.map((commit) => {
          console.log(commit, "commit");
          return (
            <a
              key={commit.node_id}
              href={commit.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {commit.commit.message}
            </a>
          );
        })}
      </div>
      <h1>hola</h1>
    </>
  );
}

export default App;
