import Style from "./Commit.module.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Alert,
  Avatar,
  Box,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";

import moment from "moment/moment";
import { useState } from "react";

const Commit = ({ data }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [showMore, setShowMore] = useState(false);
  let messages = data.commit.message.split("\n");
  const title = messages.shift();

  const commitData = {
    title: title,
    messages: messages,
    url: data.html_url,
    date: data.commit.committer.date,
    sha: data.sha,
  };
  const committerData = {
    commiter_name: data.committer.login,
    commiter_avatar: data.committer.avatar_url,
    commiter_redirect: data.committer.html_url,
  };

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
        <Box className={Style.title_container}>
          <a href={commitData.url} target="_blank" rel="noreferrer">
            <Typography component={"h2"} fontSize={"16px"} fontWeight={600}>
              {commitData.title}
            </Typography>
          </a>
          <Tooltip title="Show more..." placement="bottom-start">
            <button
              className={Style.icon_buttons}
              onClick={() => setShowMore(!showMore)}
            >
              <MoreHorizIcon
                sx={{
                  height: "20px",
                  fill: "#fff",
                }}
              />
            </button>
          </Tooltip>
        </Box>
        <Box
          sx={{
            maxWidth: "100%",
          }}
        >
          {showMore &&
            commitData.messages.map((messages, index) => {
              return (
                <Typography
                  key={index + messages.slice(0, 3)}
                  component={"p"}
                  fontSize={"14px"}
                  fontFamily={"monospace"}
                >
                  {messages}
                </Typography>
              );
            })}
        </Box>

        <Box className={Style.user_container}>
          <a
            href={committerData.commiter_redirect}
            target="_blank"
            rel="noreferrer"
          >
            <Avatar
              src={committerData.commiter_avatar}
              alt="Commiter avatar"
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </a>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {" "}
            <a
              href={committerData.commiter_redirect}
              target="_blank"
              rel="noreferrer"
            >
              <Typography component={"h3"} fontSize={"14px"} fontWeight={600}>
                {committerData.commiter_name}
              </Typography>
            </a>
            <Typography component={"p"} fontSize={"12px"}>
              committed
            </Typography>
          </Box>
          <Typography component={"p"} fontSize={"12px"}>
            {moment(commitData.date).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box className={Style.scnd_col}>
        <button
          className={Style.icon_buttons}
          onClick={() => copyToClipboard(commitData.sha)}
        >
          <ContentCopyIcon
            sx={{
              fill: "#fff",
            }}
          />
        </button>
        <a href={commitData.url} target="_blank" rel="noreferrer">
          <Typography component={"p"} fontSize={"12px"} fontWeight={300}>
            {commitData.sha.slice(0, 7)}
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

export default Commit;
