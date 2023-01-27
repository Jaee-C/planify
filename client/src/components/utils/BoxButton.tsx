import React, {MouseEventHandler} from 'react';
import Button from 'src/components/utils/Button';

interface BoxbuttonProp {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

/**
 * React component for a square-shaped button
 * @param children
 * @param onClick - event handler for a mouse click
 * @constructor
 */
export default function BoxButton({children, onClick}: BoxbuttonProp) {
  return (
    <div className="px-2 py-1.5 rounded-md hover:bg-neutral-500/30">
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}
