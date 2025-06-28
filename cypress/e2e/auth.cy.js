describe('User Authentication', () => {
  it('redirects to sign in when not authenticated', () => {
    cy.visit('/favorites')
    cy.url().should('include', '/auth/signin')
  })
  it('logs in and accesses protected route', () => {
    cy.visit('/auth/signin')
    cy.get('input[name="email"]').type('demo@example.com')
    cy.get('input[name="password"]').type('demo123{enter}')
    cy.url().should('not.include', '/auth/signin')
    cy.visit('/favorites')
    cy.contains('Your saved items').should('exist')
  })
})
