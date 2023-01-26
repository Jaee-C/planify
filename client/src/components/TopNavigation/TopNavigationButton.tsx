import React, { MouseEventHandler } from 'react';
import Button from 'src/components/Button';

interface TopNavButtonProps {
  children: React.ReactNode,
  onClick: MouseEventHandler,
  active: boolean
}

export const borderClassNames = 'border-b-4 border-black';

export default function TopNavigationButton({ children, onClick, active }: TopNavButtonProps) {
  return (
    <div className={'mx-1 flex items-center justify-center flex-col h-full ' +
        (active ? borderClassNames : '')}>
      <Button onClick={onClick}>
        {children}
      </Button>
    </div>
  )
}
