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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('purchase', (amount) => {
  cy.get('#lotto-purchase').type(amount);
  cy.get('[data-cy=lotto-purchase__form]').submit();
});

Cypress.Commands.add('checkResult', (winningTicket) => {
  cy.get('[data-cy=winning-ticket__form] input[type="number"]').each(($el, i) => {
    cy.wrap($el).type(winningTicket[i]);
  });
  cy.get('[data-cy=winning-ticket__form]').submit();
});

Cypress.Commands.add('restart', (winningTicket) => {
  cy.get('다시 시작하기').click();
});
