import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/react';

import TopNavigation from 'src/components/TopNavigation/TopNavigation';

const links = [
  { text: 'Home', location: "/" },
  { text: 'Projects', location: "/contact" },
];
test.each(links)(
  "Check if Nav Bar have %s entry.",
  (link) => {
    render(<TopNavigation />);
    //Ensure the text is in the dom, will throw error it can't find
    const linkDom = screen.getByText(link.text);

    //use jest assertion to verify the link property
    // expect(linkDom).toHaveAttribute("href", link.location);
  }
);
