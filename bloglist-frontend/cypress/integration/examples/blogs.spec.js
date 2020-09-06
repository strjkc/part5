const { idText, createYield } = require("typescript")

describe('login form', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/test/reset')
        const newUser = {
          username: 'testUser',
          name: 'Test User',
          password: 'testUser'
        }
        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.visit('http://localhost:3000/')
    })
    it('login form is displayed by default', function() {
        cy.get('#login-container')
        .should('contain','Log in to application')
        .and('contain','username')
        .and('contain','password')
        .and('contain','Login')
        cy.get('#username-input')
        cy.get('#password-input')
    })

    it('the user is able to log in', function() {
      cy.get('#username-input').type('testUser')
      cy.get('#password-input').type('testUser')
      cy.contains('Login').click()
      cy.contains('Test User logged in')
    })
})