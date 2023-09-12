// import Style from "./Commit.module.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, Snackbar } from "@mui/material";

import moment from "moment/moment";
import { useState } from "react";

const Commit = ({ data }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const title = data.commit.message.split("\n").shift();
  const message = data.commit.message;

  const commitData = {
    title: title,
    message: message,
    url: data.html_url,
    date: data.commit.committer.date,
    sha: data.sha, //'7'
  };
  const committerData = {
    commiter_name: data.committer.login,
    commiter_avatar: data.committer.avatar_url,
    commiter_redirect: data.committer.html_url,
  };

  console.log(commitData.message, "the rest");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px 6px",
        width: "100%",
      }}
    >
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <Alert
          variant="filled"
          elevation={6}
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied!
        </Alert>
      </Snackbar>
      <div>
        <h2>
          <a href={commitData.url} target="_blank" rel="noreferrer">
            {commitData.title}
          </a>
        </h2>
        <div
          style={{
            display: "flex",
          }}
        >
          <img
            src={committerData.commiter_avatar}
            alt="avatar"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
          <h3>
            <a
              href={committerData.commiter_redirect}
              target="_blank"
              rel="noreferrer"
            >
              {committerData.commiter_name}
            </a>
          </h3>
          <p>Comitted {moment(commitData.date).fromNow()}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button onClick={() => copyToClipboard(commitData.sha)}>
          <ContentCopyIcon />
        </button>
        <a href={commitData.url} target="_blank" rel="noreferrer">
          <p>{commitData.sha.slice(0, 7)}</p>
        </a>
      </div>
    </div>
  );
};

export default Commit;
