import React, {MouseEventHandler} from 'react';

interface ButtonProp {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

/**
 * React component for a basic button.
 * @param children
 * @param onClick - event handler on mouse click
 * @constructor
 */
export default function Button({children, onClick}: ButtonProp) {
  return (
    <a href="src/components/utils/Button#" onClick={onClick}>
      {children}
    </a>
  );
}
