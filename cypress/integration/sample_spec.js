describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') 
    cy.contains('Welcome to YouTube MP3 Downloader')
  })
})
