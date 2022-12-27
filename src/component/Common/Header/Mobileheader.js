import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Createpost from "./Createpost";
export default function Header(props) {
  const [post, setpost] = useState(false);
  let { id } = useParams();
  let history = useHistory();
  let location = useLocation();
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="bar_control">
        <AppBar
          position="static"
          style={{
            backgroundColor: "#fff",
            color: "#333",
            boxShadow: "0 2px 24px 0 rgb(0 0 0 / 15%)",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <KeyboardBackspaceIcon onClick={() => history.goBack()} />
            </IconButton>
            <div className="title_cls">{props.title}</div>
            <Box sx={{ flexGrow: 1 }} />
            {id === "add" && (
              <div
                style={{ display: "grid", fontSize: "14px", lineHeight: "1" }}
              >
                <label>Create Post</label>
                <div style={{ textAlign: "center" }}>
                  <AddBoxOutlinedIcon onClick={() => setpost(true)} />
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Createpost
        show={post}
        stop={() => setpost(false)}
        start={() => setpost(false)}
      />
    </>
  );
}
