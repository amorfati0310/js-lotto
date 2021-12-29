/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
before(() => {
  cy.visit('https://amorfati0310.github.io/js-lotto/');
});

describe('', () => {
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    // when
    cy.purchase(3000);
    // then
    cy.get(`[data-cy="lotto-ticket"]`).should('have.length', 3);
  });
});
