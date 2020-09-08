const { array } = require("prop-types")

describe('Blog test', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    const newUser = {
      username: 'testUser',
      name: 'Test User',
      password: 'testUser'
    }
    const secondNewUser = {
      username: 'testUser2',
      name: 'Test User II',
      password: 'testUser2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.request('POST', 'http://localhost:3003/api/users', secondNewUser)
    cy.visit('http://localhost:3000/')
})
  describe('login form', function(){
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
    
    it('the user is unable to log in with wrong credentials', function(){
      cy.get('#username-input').type('testUser')
      cy.get('#password-input').type('somepass')
      cy.contains('Login').click()
      cy.contains('wrong username or password')
      cy.contains('Login')
    })
})

describe('User can post blogs', function(){
    beforeEach(function(){
      cy.login('testUser', 'testUser')
    })
    it('Blog can be created', function(){
      cy.contains('New blog')
      .click()
      cy.get('#title-input').type('New blog')
      cy.get('#author-input').type('Test User')
      cy.get('#content-input').type('New blog content')
      cy.get('#url-input').type('http://fakeurl.com')
      cy.contains('Post').click()
      cy.get('#blog-container')
      .contains('New blog')
    })
    it('the user can like a blog', function(){
        cy.insertBlog('new blog')
        cy.contains('View').click()
        cy.get('#likes').contains('0')
        cy.contains('Like').click()
        cy.get('#likes').contains('1')
    })
    it('the user can delete a blog', function(){
      cy.insertBlog('new blog')
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.get('#blog-container').should('not.contain', 'newblog')
    })
    it('the user can\'t delete others blog', function(){
      cy.insertBlog('new blog')
      cy.login('testUser2', 'testUser2')
      cy.contains('View').click()
      cy.get('#blog-container').should('not.contain', 'Remove')
    })
    it('blog are ordered by likes', function() {
      cy.insertBlog('First blog', 1)
      cy.insertBlog('Second blog', 2)
      cy.insertBlog('Third blog', 3)
      let array1 = []
      cy.get('.blogContainer').then(response => {
        for(let i = 0; i < response.length; i ++ )
        {
          cy.wrap(response[i]).find('#likes')
          .then(resp => array1.push(resp.text()))
        }
      }).then(() => {
        cy.log(array1)
        for (let i = 0; i < array1.length - 1; i ++ )
        {
          cy.expect(Number(array1[i])).to.be.greaterThan(Number(array1[ i + 1 ]))
        }})
      
    })
})})
