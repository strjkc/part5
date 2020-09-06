const { idText, createYield } = require("typescript")

describe('login form', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/test/reset')
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
})