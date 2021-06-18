import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SidebarOption from "./SidebarOption";
import AddIcon from "@material-ui/icons/Add";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>HQ</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <Link to="/threads">
        <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      </Link>
      <SidebarUp className="HELLO">
        {isExpanded ? (
          <>
            <Link to="/shop">
              <SidebarOption Icon={LocalMallIcon} title="Shop" />
            </Link>
            <Link to="/addOfer">
              <SidebarOption Icon={AddIcon} title="Add your product" />
            </Link>
            <Link to="/people">
              <SidebarOption
                Icon={PeopleAltIcon}
                title="People & user groups"
              />
            </Link>
            <SidebarOption Icon={AppsIcon} title="Apps" />
            <Link to="/quiz">
              <SidebarOption Icon={BorderColorIcon} title="My Quiz" />
            </Link>
            <SidebarOption
              expand={setIsExpanded}
              Icon={ExpandLessIcon}
              title="Show less"
            />
          </>
        ) : (
          <SidebarOption
            expand={setIsExpanded}
            Icon={ExpandMoreIcon}
            title="Show more"
          />
        )}
      </SidebarUp>

      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />

      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
      {loading && <LinearProgress />}
      {channels?.docs.map((doc, index) => (
        <Link to="/" key={index}>
          <SidebarOption title={doc.data()?.name} key={doc.id} id={doc.id} />
        </Link>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarUp = styled.div``;

const SidebarContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  background-color: var(--slack-color);
  color: white;

  flex: 0.3;
  max-width: 260px;
  margin-top: 60px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    background-color: #fff;
    font-size: 18px;
    border-radius: 999px;
    cursor: pointer;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
