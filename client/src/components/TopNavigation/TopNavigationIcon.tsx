import React, {MouseEventHandler} from 'react';
import RoundButton from 'src/components/utils/RoundButton';

interface NavigationIconProp {
  icon: React.ReactNode;
  onClick: MouseEventHandler;
}

export default function TopNavigationIcon({icon, onClick}: NavigationIconProp) {
  return <RoundButton onClick={onClick}>{icon}</RoundButton>;
}
