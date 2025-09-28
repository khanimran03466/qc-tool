baseUrl: 'http://localhost:3000',
video: false,
viewportWidth: 1280,
viewportHeight: 720,
e2e: {
    setupNodeEvents(on, config) {
        // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
}