describe('Search functionality', () => {
  it('filters news as you type', () => {
    cy.visit('/')
    cy.get('input[placeholder="Search news, movies, posts..."]').type('AI')
    cy.contains('Searching for:').should('exist')
  })
})
