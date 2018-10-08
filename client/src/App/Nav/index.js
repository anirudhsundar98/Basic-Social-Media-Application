import React from 'react';
import { MainPageButton } from "./MainPageButton";
import { Logout } from "./Logout";
import './index.css';

export function Nav(props) {
  let GoToMainPage = null;
  if (window.location.pathname !== "/") {
    GoToMainPage = <MainPageButton />;
  }

  return (
    <nav>
      { GoToMainPage }
      <Logout />
    </nav>
  );
}