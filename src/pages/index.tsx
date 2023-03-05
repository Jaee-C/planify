import React from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';
import BaseSidebar from '../components/Sidebar/BaseSidebar';

import TopNavigation from '../components/TopNavigation/TopNavigation';

/**
 * Entrypoint page for the application.
 * @constructor
 */
export default function Home() {
  return (
    <>
      <TopNavigation />
      <ProSidebarProvider>
        <BaseSidebar />
      </ProSidebarProvider>
    </>
  );
}
