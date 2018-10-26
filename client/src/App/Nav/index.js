import React from 'react';
import { MainPageButton } from "./MainPageButton";
import { UserPageButton } from "./UserPageButton";
import { SettingsButton } from "./SettingsButton";
import { Logout } from "./Logout";
import './index.css';

export function Nav(props) {
  let navItemCounter = 1;
  let mainPageButton = null;
  if (window.location.pathname !== "/") {
    mainPageButton = <MainPageButton />;
    navItemCounter++;
  }

  let settingsButton = null;
  let userPageButton = null;
  if (props.session.username) {
    if (window.location.pathname === `/users/${escape(props.session.username)}`) {
      settingsButton = <SettingsButton />;
    } else {
      userPageButton = <UserPageButton username={props.session.username} />;
    }
    navItemCounter++;
  }

  let nav = document.querySelector("nav");
  if (nav) {
    document.querySelector("nav").style.height = `${75 * navItemCounter}px`;
  }

  return (
    <nav>
      { settingsButton }
      { mainPageButton }
      { userPageButton }
      <Logout />
    </nav>
  );
}