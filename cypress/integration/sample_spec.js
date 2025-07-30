describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('🎵 YouTube to MP3') 
  })
})