import React from 'react';
import { mount } from '@cypress/react';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  beforeEach(() => {
    mount(<NavBar />);
  });

  it('renders navigation items correctly', () => {
    cy.get('.mainLinks').should('have.length', 4);
    cy.get('.mainLinks').eq(0).should('contain', 'Home');
    cy.get('.mainLinks').eq(1).should('contain', 'Search');
    cy.get('.mainLinks').eq(2).should('contain', 'Courses');
    cy.get('.mainLinks').eq(3).should('contain', 'Login');
  });
});
