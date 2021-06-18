import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./comps/Header";
import styled from "styled-components";
import Sidebar from "./comps/Sidebar";
import Chat from "./comps/Chat";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./comps/Login";
import Spinner from "react-spinkit";
import Threads from "./comps/Threads";
import People from "./comps/People";
import Quiz from "./comps/Quiz";
import Shop from "./comps/Shop";
import Checkout from "./comps/Checkout";
import AddOfer from "./comps/AddOfer";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img
            src="https://webdesigntips.blog/wp-content/uploads/2019/02/Slack-sparks-further-outrage-with-tweak-to-new-logo.jpg"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContent>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  <Chat />
                </Route>
                <Route path="/threads">
                  <Threads />
                </Route>
                <Route path="/people">
                  <People />
                </Route>
                <Route path="/quiz">
                  <Quiz />
                </Route>
                <Route path="/shop">
                  <Shop />
                </Route>
                <Route path="/checkout">
                  <Checkout />
                </Route>
                <Route path="/addOfer">
                  <AddOfer />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
