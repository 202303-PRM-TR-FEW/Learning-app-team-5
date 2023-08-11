import React from 'react'
import LevelFilter from './LevelFilter'

describe('<LevelFilter />', () => {
  it('renders without errors and displays checkboxes', () => {
    const levels = [
      { value: 'beginner', label: 'Beginner', checked: false },
      { value: 'intermediate', label: 'Intermediate', checked: true },

    ];

    const handleChange = cy.stub().as('handleChange');

    cy.mount(
      <LevelFilter
        levels={levels}
        onChange={handleChange}
      />);

    // Check if the checkboxes are displayed
    cy.get('input[type="checkbox"]').should('have.length', levels.length);
  });
});
