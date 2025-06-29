describe('Search functionality', () => {
  it('filters news as you type', () => {
    cy.visit('/')
    cy.get('input[placeholder="Search news, movies, posts..."]').type('Final Destination')
    cy.contains('Searching for:').should('final destination')
  })
})
