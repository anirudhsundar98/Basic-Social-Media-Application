import React from 'react';
import { MainPageButton } from "./MainPageButton";
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
  if (props.session.username && window.location.pathname === `/users/${props.session.username}`) {
    settingsButton = <SettingsButton />;
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
      <Logout />
    </nav>
  );
}