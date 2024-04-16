describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('/') 
  })

  it('can enter a city name', () => {
    cy.get('[data-testid="input-city"]', { timeout: 10000 }).first().type('Almaty')
    cy.get('[data-testid="get-weather-btn"]').first().click()
    // cy.get('.weather-details').should('contain', 'Almaty')
  })
})
