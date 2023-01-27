import React, {MouseEventHandler} from 'react';
import Button from 'src/components/utils/Button';

interface RoundButtonProp {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

/**
 * React component for a round button. Intended for use as an icon button.
 * @param children
 * @param onClick - event handler on mouse click
 * @constructor
 */
export default function RoundButton({children, onClick}: RoundButtonProp) {
  return (
    <div className="mr-2 px-1 py-1 rounded-full hover:bg-neutral-500/30">
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}
