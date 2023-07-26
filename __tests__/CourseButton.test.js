import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CourseButton from '../components/course-general-components/CourseButton';

test("fires the click event correctly", () => {
  const buttonName = "Click Me";
  const handleClick = jest.fn(); // Mocking the click handler function

  // Render the CourseButton component with the mock click handler
  const { getByText } = render(
    <CourseButton buttonName={buttonName} handleClick={handleClick} />
  );

  const buttonElement = getByText(buttonName);

  // Simulate a click on the button
  fireEvent.click(buttonElement);

  // Assert that the handleClick function was called once
  expect(handleClick).toHaveBeenCalledTimes(1);
});
