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

  it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다', () => {
    // when
    cy.purchase(3000);
    cy.checkResult([1, 2, 3, 4, 5, 6, 7]);
    // then
    cy.contains('당첨 통계').should('be.visible');
  });

  it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다', () => {
    // when
    cy.purchase(3000);
    cy.checkResult([1, 2, 3, 4, 5, 6, 7]);
    cy.restart().then(() => {
      cy.get('#lotto-purchase').should('be.empty');
      cy.get('[data-cy=winning-ticket__form] input[type="number"]').each(($el, i) => {
        cy.wrap($el).should('be.empty');
      });
      cy.contains('당첨 통계').should('not.exist');
    });
  });
});
