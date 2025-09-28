const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
});

describe('Sample Test', () => {
  it('should visit the application and check the title', () => {
    cy.visit('/');
    cy.title().should('include', 'Your App Title');
  });
});