import React, {MouseEventHandler} from 'react';
import Button from './Button';

interface BoxButtonProp {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

/**
 * React component for a square-shaped button
 *
 * @param children - children React components
 * @param onClick - event handler for a mouse click
 * @returns square shaped button component
 */
export default function BoxButton({children, onClick}: BoxButtonProp) {
  return (
    <div className="px-2 py-1.5 rounded-md hover:bg-neutral-500/30">
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}
