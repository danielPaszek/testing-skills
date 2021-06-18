import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "../features/appSlice";
import { db } from "../firebase";

function SidebarOption({ Icon, title, addChannelOption, expand, id }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom(id));
    }
    if (expand) {
      expand((prev) => !prev);
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: "10px" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  color: white !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-size: 12px;
    font-weight: 500;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;

  > span {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12px;
  }
`;
