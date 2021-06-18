import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Badge } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectAmountInCart } from "../features/appSlice";

function Header() {
  const [user] = useAuthState(auth);
  const [expandedOptions, SetExpandedOptions] = useState(false);
  const addUser = () => {
    db.collection("users").doc(user.uid).set({
      user: user?.displayName,
      userImage: user?.photoURL,
    });
  };
  const dispatch = useDispatch();

  const cartAmount = useSelector(selectAmountInCart);
  return (
    <HeaderContainer>
      {expandedOptions && (
        <Options>
          <p onClick={addUser}>
            Join Tournament <AddIcon />
          </p>
          <Link to="/checkout">
            <p>
              CART <ShoppingCartIcon />
            </p>
          </Link>
          <p
            onClick={() => {
              dispatch(clearCart());
              auth.signOut();
            }}
          >
            Logout <PowerSettingsNewIcon />
          </p>
        </Options>
      )}

      <HeaderLeft>
        <HeaderAvatar
          onClick={() => SetExpandedOptions((prev) => !prev)}
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="search" />
      </HeaderSearch>
      <HeaderRight>
        <Link to="/checkout">
          <Badge badgeContent={cartAmount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Link>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const Options = styled.div`
  z-index: 1000;
  position: fixed;
  top: 60px;
  left: 10px;
  background-color: #331934;
  border-radius: 10px;
  padding: 15px;
  padding-bottom: 0px;
  min-width: 150px;

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;
    color: white;
    text-decoration: none;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    color: white !important;
    margin-right: 15px;
  }
  .MuiBadge-root,
  .MuiBadge-root > .MuiSvgIcon-root {
    width: 30px;
    height: 30px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 10px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
  > .MuiSvgIcon-root {
    color: gray;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;
