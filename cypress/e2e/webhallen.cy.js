function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
/// <reference types="cypress" />
describe('User Journey from main to checkout', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit("http://webhallen.com/se")
    })
    it("Allows searches in search field", () => {
        cy.get('.search').type('Dungeons and Dragons')
        cy.get('.search-button').click()
        cy.get('h1').contains('Sökresultat för "Dungeons and Dragons"')
    })
    it("Allows adding an item to the cart", () => {
        cy.get('.search').type('Nintendo Switch')
        cy.get('.search-button').click()
        cy.get('h1').contains('Sökresultat för "Nintendo Switch"')
        cy.get('.product-list-page > :nth-child(1) > .panel-thin > .panel-body > .panel-top > :nth-child(1)').click()
        cy.get('#add-product-to-cart > .text-btn').click()
        cy.get('.add-insurance > ._secondary > span').click()
        cy.get('.toast-alert').should('exist').contains('Du har lagt till en produkt i varukorgen')
    })
    it("Allows moving to checkout when an item is in the cart", () => {
        cy.get('.search').type('PS5 + God of War')
        cy.get('.search-button').click()
        cy.location('pathname').should('contain', '/se/search')
        cy.get('h1').contains('Sökresultat för "PS5 + God of War"')
        cy.wait(500)
        cy.get('.product-list-page > :nth-child(1) > .panel-thin > .panel-body > .panel-top > :nth-child(1)').click()
        cy.wait(500)
        cy.get('#add-product-to-cart > .text-btn').click()
        cy.wait(500)
        cy.get('.add-insurance > ._secondary > span').click()
        cy.get('.toast-alert').should('exist').contains('Du har lagt till en produkt i varukorgen')
        cy.get('.cart-header').click()
        cy.get('.to-checkout a').should('exist').click()
        cy.location('pathname').should('contain', '/se/checkout')
        cy.wait(500)
        cy.get('.mb-1').click()
        cy.get('.continue-btn').click()
        cy.get('.input-field').type('21221')
        cy.wait(5000)
        cy.get(':nth-child(1) > .list-group-item > .shipping-header > .radio-checkbox-label > .col-xs-9').click()
        cy.get('.continue-btn').click()
        cy.get(':nth-child(1) > .list-group-item > .pl-0 > .radio-checkbox-label').click()
        cy.get('.continue-btn').click()
        cy.get('#first-name').type('Rasmus')
        cy.get('#last-name').type('Ivarsson')
        cy.get('#street').type('Vattenverksvägen 17B')
        cy.get('#zip').type('21221')
        cy.get('#city').type('Malmö')
        cy.get('#phone').type('0733900663')
        cy.get('#email').type('rasmus01234+test@gmail.com')
        cy.get('#confirm-email').type('rasmus01234+test@gmail.com')
        cy.get('.confirm-order-btn').should('exist')
    })
})
describe('User account manipulation', () => {
    var x = getRandomInt(1000)
    var estr = x+"rasmustest@example.se"
    var ustr = x+"rasmustest"
    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit("https://www.webhallen.com/se/")
        cy.wait(500)
    })
    it.only("Allows creation of new user account", () => {
        cy.wait(1000)
        cy.get('.d-flex > .icon-button-wrapper > .icon-button').click()
        cy.get('.login-footer > :nth-child(1)').first().click()
        cy.get('#email').type(estr)
        cy.get('#username').type(ustr)
        cy.get('#password').click()
        cy.get('#password').type('passwordtest')
        cy.get('#verifypassword').type('passwordtest')
        cy.get('.mt-5').should('exist')
        // cy.get('mt-5').click()
        cy.log(estr, ustr)
    })
    it("Allows log-in with existing credentials", () => {
        cy.wait(1000)
        cy.get('.d-flex > .icon-button-wrapper > .icon-button').click()
        cy.get('.icon-user > .input-field').type(ustr)
        cy.get('.icon-lock > .input-field').type('passwordtest')
        cy.get('.login-form > :nth-child(1) > .text-btn').click()
        cy.get('.profile-picture-wrap > .ximg').click()
        cy.get('.username > .secondary-link').should('exist').click()
        cy.location('pathname').should('contain', '/se/member/7336352')
    })
    it("Does NOT allow creation of new user account with existing credentials", () => {
        cy.wait(1000)
        cy.get('.d-flex > .icon-button-wrapper > .icon-button').click()
        cy.get('.login-footer a').first().click()
        cy.get('#email').type(estr)
        cy.get('#username').type(ustr)
        cy.get('#password').type('passwordtest')
        cy.get('#verifypassword').type('passwordtest')
        // cy.get('.mt-5').click()
        // cy.get('.toast-alert').should('exist').contains('Det finns redan ett konto med e-postadressen')
        // cy.get('.toast-alert').should('exist').contains('Det finns redan ett konto med användarnamnet')
    })
})