// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('insertBlog', (titleOfBlog, likesAmount) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
      const token = `bearer ${user.token}`      
      const newBlog = {
        title: titleOfBlog,
        author: 'testuser',
        content: 'content',
        url: 'asdf',
        likes: likesAmount
      }
      const request = {
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: newBlog,
        headers: { Authorization: token }
      }
      cy.request(request)
      cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', (uname, pass) => {
  const credentials = {
    username: uname,
    password: pass
  }
  cy.request('POST', 'http://localhost:3003/api/login', credentials)
  .then( response => {window.localStorage.setItem('user', JSON.stringify(response.body))
  cy.visit('http://localhost:3000/')
})
})