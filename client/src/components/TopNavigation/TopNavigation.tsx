import React, {useState} from 'react';
import {IconContext} from 'react-icons';
import {AiTwotoneSetting} from 'react-icons/ai';
import {IoHelpCircle} from 'react-icons/io5';

import TopNavigationButton from 'src/components/TopNavigation/TopNavigationButton';
import TopNavigationIcon from 'src/components/TopNavigation/TopNavigationIcon';

enum NavigationPage {
  HOME,
  PROJECTS,
  ISSUES,
  HELP,
  SETTING,
}

/**
 * React component for the page's top navigation bar
 * @returns Navigation bar component
 */
export default function TopNavigation() {
  const [activePage, setActivePage] = useState(NavigationPage.HOME);

  return (
    <header
      className="bg-blue-400 top-0 z-50 w-full px-5 h-14 flex items-center
                       justify-between shadow-xl text-sm font-medium"
    >
      <nav className="min-w-0 flex grow items-stretch relative shrink-0 h-full">
        <TopNavigationButton
          onClick={() => setActivePage(NavigationPage.HOME)}
          active={activePage === NavigationPage.HOME}
        >
          Home
        </TopNavigationButton>
        <TopNavigationButton
          onClick={() => setActivePage(NavigationPage.PROJECTS)}
          active={activePage === NavigationPage.PROJECTS}
        >
          Projects
        </TopNavigationButton>
      </nav>
      <IconContext.Provider value={{size: '24px'}}>
        <div className="flex items-center shrink-0">
          <TopNavigationIcon
            icon={<IoHelpCircle />}
            onClick={() => setActivePage(NavigationPage.HELP)}
          />
        </div>
        <div className="flex items-center shrink-0">
          <TopNavigationIcon
            icon={<AiTwotoneSetting />}
            onClick={() => setActivePage(NavigationPage.SETTING)}
          />
        </div>
      </IconContext.Provider>
    </header>
  );
}
