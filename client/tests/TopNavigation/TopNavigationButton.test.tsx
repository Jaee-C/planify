import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react';

import TopNavigationButton, { borderClassNames }
  from 'src/components/TopNavigation/TopNavigationButton';

const handleClick = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('adds bottom border when active', async () => {
  const { container } = render(
    <TopNavigationButton onClick={handleClick} active={true}>
      Button
    </TopNavigationButton>
  )

  expect(container.firstChild).toHaveClass(borderClassNames);
})

test('no bottom border when not active', async () => {
  const { container } = render(
    <TopNavigationButton onClick={handleClick} active={false}>
      Button
    </TopNavigationButton>
  )

  expect(container.firstChild).not.toHaveClass(borderClassNames);
})

test('Click event is handled', async () => {
  const {  getByText } = render(
    <TopNavigationButton onClick={handleClick} active={false}>
      Button
    </TopNavigationButton>
  );

  fireEvent.click(getByText('Button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
})

test('multiple clicks', async () => {
  const { getByText } = render(
    <TopNavigationButton onClick={handleClick} active={false}>
      Button
    </TopNavigationButton>
  );

  fireEvent.click(getByText('Button'));
  expect(handleClick).toBeCalled();
  fireEvent.click(getByText('Button'));
  expect(handleClick).toBeCalled();
  fireEvent.click(getByText('Button'));
  expect(handleClick).toBeCalled();

  expect(handleClick).toHaveBeenCalledTimes(3)
})

