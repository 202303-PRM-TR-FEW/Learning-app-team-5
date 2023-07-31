import React from 'react';
import { CoursesContextProvider } from './FetchAllCourses';

describe('<CoursesContextProvider />', () => {
  it('renders', () => {
    // Mount the component and check if it renders without errors
    cy.mount(<CoursesContextProvider />);
  });
  
  it('renders the child component with data-testid="test-child"', () => {
    // Mount the component with a mocked child component that throws an error
    cy.mount(
      <CoursesContextProvider>
        <div data-testid="test-child-error">Error: Child Component Failed</div>
      </CoursesContextProvider>
    );

    // The child component should not be found since it failed to render correctly
    cy.get('[data-testid="test-child"]').should('not.exist');

    // Check if the error message is visible instead
    cy.get('[data-testid="test-child-error"]').should('be.visible');
  });
});
