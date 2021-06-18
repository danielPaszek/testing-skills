import React from "react";
import styled from "styled-components";

function Threads() {
  return (
    <ThreadContainer>
      <ThreadItem
        href="https://mypolitics.pl/quiz"
        style={{
          backgroundImage:
            'url("https://upload.wikimedia.org/wikipedia/commons/7/71/Political_Compass_yellow_LibRight_v2.png")',
        }}
      >
        Political Compasses
      </ThreadItem>
      <ThreadItem
        href="https://reason.com/"
        target="_blank"
        style={{
          backgroundImage:
            'url("https://d2eehagpk5cl65.cloudfront.net/wp-content/themes/reason-com/dist/images/r-in-g1-01_04a07f43.svg")',
        }}
      >
        Reason tv
      </ThreadItem>
      <ThreadItem
        href="https://veto.media/"
        target="_blank"
        style={{
          backgroundImage:
            'url("https://yt3.ggpht.com/ytc/AAUvwnidns7A0NBw8sTcis2_dIGGXXvoiNV_CV8-afZP5Q=s88-c-k-c0x00ffffff-no-rj")',
        }}
      >
        Veto media
      </ThreadItem>
      <ThreadItem
        href="https://discord.gg/qp53GTS9py"
        target="_blank"
        style={{
          backgroundImage:
            'url("http://webcamstartup.com/wp-content/uploads/2018/04/discord-logo.jpg")',
        }}
      >
        Web Dev Help
      </ThreadItem>
      <ThreadItem
        href="http://www.lo8.poznan.pl/"
        target="_blank"
        style={{
          backgroundImage:
            'url("https://upload.wikimedia.org/wikipedia/commons/9/9c/Adam_Mickiewicz_wed%C5%82ug_dagerotypu_paryskiego_z_1842_roku.jpg")',
          color: "white",
        }}
      >
        Best High School
      </ThreadItem>
      <ThreadItem
        href="https://www.fiverr.com/danielpaszek"
        target="_blank"
        style={{
          backgroundImage:
            'url("https://fi.co/documents/fiverr-large-logo-2017-06-20.jpg")',
        }}
      >
        My gigs(please click! I'm starving)
      </ThreadItem>
      <ThreadItem>HELLO</ThreadItem>
      <ThreadItem>HELLO</ThreadItem>
      <ThreadItem>HELLO</ThreadItem>
    </ThreadContainer>
  );
}

export default Threads;

const ThreadContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 20px;
  margin-top: 60px;
  flex: 0.7;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  max-width: 850px;
  grid-gap: 10px;
`;
const ThreadItem = styled.a`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  background-color: #e0cea4;
  margin: 20px;
  padding: 10px;
  color: var(--slack-color);
  font-size: large;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 350ms;
  background-size: cover;
  :hover {
    transform: scale(1.08);
  }
`;
