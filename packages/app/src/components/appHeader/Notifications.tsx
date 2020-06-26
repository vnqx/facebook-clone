import React, { useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton, Popover } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../graphql/queries";
import NotificationList from "./notifications/NotificationList";
import { Notification } from "./../../../types";
import usePopover from "../../hooks/usePopover";

interface NotificationsData {
  notifications: Notification[];
}

export default function Notifications() {
  const { data } = useQuery<NotificationsData>(GET_NOTIFICATIONS);

  const { id, open, anchorEl, handleClose, handleClick } = usePopover({
    name: "notifications",
  });

  return (
    <div>
      <IconButton
        aria-label="show chats"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <NotificationsIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <NotificationList notifications={data?.notifications} />
      </Popover>
    </div>
  );
}
