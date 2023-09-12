import Style from "./Commit.module.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, Avatar, Box, Snackbar, Typography } from "@mui/material";

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
    <Box className={Style.main_container}>
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
      <Box className={Style.first_col}>
        <a href={commitData.url} target="_blank" rel="noreferrer">
          <Typography component={"h2"} fontSize={"20px"}>
            {commitData.title}
          </Typography>
        </a>

        <Box className={Style.user_container}>
          <a
            href={committerData.commiter_redirect}
            target="_blank"
            rel="noreferrer"
          >
            <Avatar src={committerData.commiter_avatar} alt="Commiter avatar" />
          </a>

          <a
            href={committerData.commiter_redirect}
            target="_blank"
            rel="noreferrer"
          >
            <Typography component={"h3"} fontSize={"18px"}>
              {committerData.commiter_name}
            </Typography>
          </a>
          <Typography component={"p"} fontSize={"16px"}>
            Comitted {moment(commitData.date).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box className={Style.scnd_col}>
        <button
          className={Style.copy_btn}
          onClick={() => copyToClipboard(commitData.sha)}
        >
          <ContentCopyIcon />
        </button>
        <a href={commitData.url} target="_blank" rel="noreferrer">
          <Typography component={"p"} fontSize={"16px"}>
            {commitData.sha.slice(0, 7)}
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

export default Commit;
