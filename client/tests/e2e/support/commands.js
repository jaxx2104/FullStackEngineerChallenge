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
Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:4000/users/authenticate",
    body: {
      email: "admin@paypay.com",
      password: "P@ssw0rd"
    }
  }).then(results => {
    console.log(results)
    window.localStorage.setItem("token", results.body.token)
  })
  cy.visit("/")
})

Cypress.Commands.add("typeReview", ({ name, reviewer, reviewee, review }) => {
  cy.get("[name=Name]")
    .clear()
    .type(name)
    .should("have.value", name)
  cy.get("[name=Reviewer]").select(reviewer)
  cy.get("[name=Reviewee]").select(reviewee)
  cy.get("[name=Performance]")
    .clear()
    .type(review)
    .should("have.value", review)
  cy.get("[name=Quality]")
    .clear()
    .type(review)
    .should("have.value", review)
  cy.get("[name='Job Knowledge']")
    .clear()
    .type(review)
    .should("have.value", review)
  cy.get("[name='Problem Solving']")
    .clear()
    .type(review)
    .should("have.value", review)
})
