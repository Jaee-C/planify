import React, {MouseEventHandler} from 'react';
import BoxButton from 'src/components/utils/BoxButton';

interface TopNavButtonProps {
  children: React.ReactNode;
  onClick: MouseEventHandler;
  active: boolean;
}

export const borderClassNames = 'border-b-black';

/**
 * React component for a button in the top navigation bar
 * @param children
 * @param onClick - event handler for a mouse click
 * @param active - whether the button is in an active state (e.g. it is clicked)
 * @constructor
 */
export default function TopNavigationButton({
  children,
  onClick,
  active,
}: TopNavButtonProps) {
  return (
    <div
      className={
        'mx-1 flex items-center justify-center flex-col h-full' +
        ' border-4 border-transparent ' +
        (active ? borderClassNames : '')
      }
    >
      <BoxButton onClick={onClick}>{children}</BoxButton>
    </div>
  );
}
