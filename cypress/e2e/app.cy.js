describe('Navigation', () => {
  it('should navigate to the welcome page', () => {
    // Start from the index page
    cy.visit('/')
    cy.get('[data-test="welcome-header"]').contains(/Discover passion/i)
  })
})