describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')  // Change if your server runs on another port
    cy.contains('Your site title or some text on homepage')
  })
})
