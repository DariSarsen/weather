import { AppComponent } from '../src/app/app.component'

describe('AppComponent', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-angular
    cy.mount(AppComponent)
  })
})