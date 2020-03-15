/// <reference types="cypress" />

context("Main user flow", () => {
  it("login", () => {
    const email = "admin@paypay.com"
    const password = "P@ssw0rd"
    cy.visit("/")
    cy.get("[name=email]")
      .type(email)
      .should("have.value", email)
    cy.get("[name=password]")
      .type(password)
      .should("have.value", password)
    cy.contains("Login").click()
  })

  it("create review", () => {
    const name = "review4"
    const reviewer = "user1"
    const reviewee = "user2"
    const review = "good"
    cy.login()
    cy.contains("Performance Review").click()
    cy.wait(1000)
    cy.contains("➕").click()
    cy.typeReview({ name, reviewer, reviewee, review })
    cy.contains("Create").click()
    cy.contains("OK").click()
  })

  it("update review", () => {
    const name = "review4"
    const reviewer = "user2"
    const reviewee = "user1"
    const review = "bad"
    cy.login()
    cy.contains("Performance Review").click()
    cy.wait(1000)
    cy.contains(name).click()
    cy.typeReview({ name, reviewer, reviewee, review })
    cy.contains("Update").click()
    cy.contains("OK").click()
  })

  it("delete review", () => {
    const name = "review4"
    cy.login()
    cy.contains("Performance Review").click()
    cy.contains(name).click()
    cy.contains("Delete").click()
    cy.contains("OK").click()
  })

  it("create user", () => {
    const name = "user3"
    const email = "user3@paypay.com"
    cy.login()
    cy.contains("Employee Management").click()
    cy.wait(1000)
    cy.contains("➕").click()
    cy.get("[name=Name]")
      .clear()
      .type(name)
      .should("have.value", name)
    cy.get("[name=Email]")
      .clear()
      .type(email)
      .should("have.value", email)
    cy.contains("Create").click()
    cy.contains("OK").click()
  })

  it("update user", () => {
    const name = "user3"
    const email = "test@paypay.com"
    cy.login()
    cy.contains("Employee Management").click()
    cy.wait(1000)
    cy.contains(name).click()
    cy.get("[name=Name]")
      .clear()
      .type(name)
      .should("have.value", name)
    cy.get("[name=Email]")
      .clear()
      .type(email)
      .should("have.value", email)
    cy.contains("Update").click()
    cy.contains("OK").click()
  })

  it("delete user", () => {
    const name = "user3"
    cy.login()
    cy.contains("Employee Management").click()
    cy.wait(1000)
    cy.contains(name).click()
    cy.contains("Delete").click()
    cy.contains("OK").click()
  })
})
