import React, { useState } from 'react';
import TopNavigationButton
  from '@/src/components/TopNavigation/TopNavigationButton';
import { setState } from 'jest-circus';

export enum NavigationPage {
  HOME,
  PROJECTS,
  ISSUES
}

export default function TopNavigation() {
  const [activePage, setActivePage] = useState(NavigationPage.HOME);

  function handleChangePage(page: NavigationPage) {
    setActivePage(page);
  }

  return (
    <header className='bg-blue-400 relative top-0 z-50 w-full px-5 h-14 flex
                       items-center justify-between shadow shadow-slate-300'>
      <nav className='min-w-0 flex grow items-stretch relative shrink-0 h-full'>
        <TopNavigationButton
          onClick={() => handleChangePage(NavigationPage.HOME)}
          activePage={activePage}
          page={NavigationPage.HOME}
        >
          Home
        </TopNavigationButton>
        <TopNavigationButton
          onClick={() => handleChangePage(NavigationPage.PROJECTS)}
          activePage={activePage}
          page={NavigationPage.PROJECTS}
        >
          Projects
        </TopNavigationButton>
      </nav>
    </header>
  );
}
