import { Button } from "@material-ui/core";
import React, { useRef } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelId, channelName, chatRef }) {
  const inputRef = useRef(null);
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    inputRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          type="text"
          placeholder={`Message #${channelName ? channelName : ""}`}
          ref={inputRef}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          <SendIcon />
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: fixed;
    bottom: 30px;
    display: flex;
    justify-content: center;
    width: 80%;
  }
  > form > input {
    flex: 0.8;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
`;
