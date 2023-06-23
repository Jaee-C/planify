import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoHelpCircle } from "react-icons/io5";

import TopNavigationButton from "./TopNavigationButton";
import TopNavigationIcon from "./TopNavigationIcon";
import Link from "next/link";

export enum NavigationPage {
  HOME,
  PROJECTS,
  BACKLOG,
  HELP,
  SETTING,
}

interface TopNavigationProps {
  activePage: NavigationPage;
}

/**
 * React component for the page's top navigation bar
 * @returns Navigation bar component
 */
export default function TopNavigation(props: TopNavigationProps): JSX.Element {
  return (
    <header
      className="bg-blue-400 top-0 z-50 w-full px-5 h-14 flex items-center
                       justify-between shadow-xl text-sm font-medium">
      <nav className="min-w-0 flex grow items-stretch relative shrink-0 h-full">
        <TopNavigationButton
          href="/"
          active={props.activePage === NavigationPage.HOME}>
          Home
        </TopNavigationButton>
        <TopNavigationButton
          href="/projects"
          active={props.activePage === NavigationPage.PROJECTS}>
          Projects
        </TopNavigationButton>
      </nav>
      <IconContext.Provider value={{ size: "24px" }}>
        <div className="flex items-center shrink-0">
          <TopNavigationIcon icon={<IoHelpCircle />} />
        </div>
        <div className="flex items-center shrink-0">
          <TopNavigationIcon icon={<AiTwotoneSetting />} />
        </div>
      </IconContext.Provider>
    </header>
  );
}
