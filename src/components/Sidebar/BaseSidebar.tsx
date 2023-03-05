import React from 'react';
import {Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import {GoProject, GoChecklist, GoListUnordered} from 'react-icons/go';
import BoxButton from '../utils/BoxButton';

export default function BaseSidebar() {
  const {collapseSidebar} = useProSidebar();
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        minHeight: '400px',
      }}
    >
      <Sidebar width="200px">
        <div style={{display: 'flex', flexDirection: 'column', height: '95%'}}>
          <div style={{flex: 1, marginBottom: '32px'}}>
            <Menu>
              <MenuItem icon={<GoListUnordered />}> Backlog</MenuItem>
              <MenuItem icon={<GoProject />}> Board</MenuItem>
              <MenuItem icon={<GoChecklist />}> Issues</MenuItem>
            </Menu>
          </div>
          <div style={{paddingBottom: '20px'}}>
            <BoxButton onClick={() => collapseSidebar()}>Collapse</BoxButton>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
