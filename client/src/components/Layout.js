import React from 'react';
import { NavMenu } from './NavMenu';

export const Layout = (props) => (
  <div>
    <NavMenu />
    {props.children}
  </div>
);
