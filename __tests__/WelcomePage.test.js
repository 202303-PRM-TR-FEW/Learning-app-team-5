import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../app/page';

test('renders the Home component correctly', () => {
  // Render the Home component
  render(<Home />);

  // Check if the LearnU logo, header, paragraph, and "GET STARTED" button are rendered
  const learnULogo = screen.getByAltText('Learn U logo');
  const headerText = screen.getByText('Discover passion');
  const paragraphText = screen.getByText(
    'Find out what topics you find interesting, learn a new skill & connect with people that are passionate about similar topics.'
  );
  const getStartedButton = screen.getByText('GET STARTED');

  // Assert that each element is present in the document
  expect(learnULogo).toBeInTheDocument();
  expect(headerText).toBeInTheDocument();
  expect(paragraphText).toBeInTheDocument();
  expect(getStartedButton).toBeInTheDocument();

});
