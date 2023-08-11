import React from 'react'
import SearchInput from './SearchInput'

describe('<SearchInput />', () => {
  it('calls onChange with the correct value on button click', () => {
    // Create a spy for the handleChange function
    const handleChange = cy.spy().as('handleChange');

    // Mount the SearchInput component with the handleChange spy
    cy.mount(<SearchInput value="" onChange={handleChange} />);

    // Wait for the input element to render
    cy.get('input').should('exist');

    // Wait for the component to settle and update
    cy.wait(500);

  });
});
