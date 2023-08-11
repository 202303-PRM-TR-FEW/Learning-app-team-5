import React from 'react'
import LoginPage from './LoginCard'
import { GetAllCourses } from "../../app/context/FetchAllCourses";

describe('<LoginPage />', () => {

 it('by using application service', () => {
  cy.log('user service login')

  const { Allcourses } = GetAllCourses();


  cy.wrap(Allcourses.login(Cypress.env('email'), Cypress.env('password')), {
   log: false,
  }).then((user) => {
   // the userService.login resolves with "user" object
   // and we can assert its values inside .then()

   // confirm general shape of the object
   expect(user).to.be.an('array')
   expect(user).to.have.keys([
    'username',
    'id',
    'email',
    'password'
   ])

   // we don't know the token or id, but we know the expected names
   expect(user).to.contain({
    username: 'test',
    email: 'testtest@test.com',
    password: '123123asd',
   })
  })

  // cy.visit command will wait for the promise returned from
  // the "userService.login" to resolve. Then local storage item is set
  // and the visit will immediately be authenticated and logged in
  cy.visit('/')
  // we should be logged in
  cy.contains('Hi Test!').should('be.visible')
 })

 it('can assert against resolved object using .should', () => {
  cy.log('user service login')

  // same login promise
  cy.wrap(Allcourses.login(Cypress.env('username'), Cypress.env('password')), {
   log: false,
  })
   // but resolved value checked using implicit assertions
   // that can be easier to read
   .should('be.an', 'array')
   .and('have.keys', ['username', 'id', 'email', 'password'])
   .and('contain', {
    username: 'test',
    city: 'test',
   })

  // cy.visit command will wait for the promise returned from
  // the "userService.login" to resolve. Then local storage item is set
  // and the visit will immediately be authenticated and logged in
  cy.visit('/login')
  // we should be logged in
  cy.contains('Hi Test!').should('be.visible')
 })

 /**
* Custom command to log in using application method.
* Commands are automatically waited on, thus we don't need extra "cy.wrap"
* around the returned promise.
*
* @example cy.login()
*/
 Cypress.Commands.add(
  'login',
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
   return Allcourses.login(email, password)
  }
 )

 it('by wrapping application code in custom command', () => {
  // custom commands are automatically chained
  cy.login()
  // thus the visit will not start until the promise returned
  // by the application code inside the custom command "login" resolves
  cy.visit('/login')
  cy.contains('Hi Test!').should('be.visible')
 })

});
