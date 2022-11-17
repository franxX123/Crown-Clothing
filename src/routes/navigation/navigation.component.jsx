import { Outlet } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles.jsx";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { DropDownContext } from "../../context/dropDown.context";

export default function Navigation() {
  // IMPORTANT: Whenever currentUser changes, this function will re-run
  // but the component doesn't re-render. This is because the state variables
  // weren't used in any of the html elements in the component.
  // Virtual-dom doesn't create any see any changes in the updated version
  // therefore no changes are made in the actual DOM.
  // const signOutHandler = async () => {
  //   // sign out
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  const { currentUser } = useContext(UserContext);
  const { currentDDClickedState } = useContext(DropDownContext);

  // NOTE: Fragment is like an html element that wraps around a bunch of elements but renders to nothing

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {currentDDClickedState ? <CartDropDown /> : ""}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}
