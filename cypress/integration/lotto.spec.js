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
  // cy.visit('localhost:8080');
  cy.visit('https://amorfati0310.github.io/js-lotto/');
});

describe('', () => {
  it('로또 구입 금액을 입력하면, 금액에 수동 구매 입력 폼을 보여준다.', () => {
    // when
    cy.purchase(3000);
    // then
    cy.contains('수동 구매할 갯수를 입력해주세요').should('be.visible');
  });

  it('수동 구매 입력 폼에 입력한 갯수만큼 수동 입력폼을 보여준다.', () => {
    // when
    const amount = 2;
    const inputNumbers = 6;
    cy.autoPurchase(amount);
    // then
    cy.contains('수동 티켓 1');
    cy.contains('수동 티켓 2');
    cy.get('[name=manual]').should('have.length', amount * inputNumbers);
  });

  it('수동 티켓을 구매하면 남은 금액으로 자동 티켓을 발급 받는다.', () => {
    // when
    cy.submitAutoTicket([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    // then
    cy.contains('총 3개를 구매하였습니다.').should('be.visible');
  });

  it('당첨 티켓 번호 추첨한 후(입력한 후) 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다', () => {
    // when
    cy.checkResult([1, 2, 3, 4, 5, 6, 7]);
    // then
    cy.contains('당첨 통계').should('be.visible');
  });

  it('다시 시작하기 버튼을 처음 상태로 돌아간다.', () => {
    // when
    cy.restart().then(() => {
      cy.get('#lotto-purchase').should('have.value', '');
      cy.get('[data-cy=winning-ticket__form] input[type="number"]').each(($el, i) => {
        cy.wrap($el).should('be.empty');
      });
      cy.contains('당첨 통계').should('not.be.visible');
      cy.contains('수동 구매할 갯수를 입력해주세요').should('not.be.visible');
      cy.contains('번호보기').should('not.be.visible');
      cy.contains('결과 확인하기').should('not.be.visible');
    });
  });
});
