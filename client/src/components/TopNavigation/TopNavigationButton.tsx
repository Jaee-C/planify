import React, { MouseEventHandler, useState } from 'react';
import Button from '@/src/components/Button';
import { NavigationPage } from '@/src/components/TopNavigation/TopNavigation';

interface TopNavButtonProps {
  children: React.ReactNode,
  onClick: MouseEventHandler,
  page: NavigationPage,
  activePage: NavigationPage
}

const borderClassNames = 'border-b-4 border-black';

export default function TopNavigationButton({ children, onClick, page, activePage }: TopNavButtonProps) {
  const [active, setActive] = useState(false);

  function triggerActive() {
    setActive(!active);
  }

  return (
    <div className={'mx-1 flex items-center justify-center flex-col h-full ' +
        (page == activePage ? borderClassNames : '')}>
      <Button onClick={onClick}>
        {children}
      </Button>
    </div>
  )
}
