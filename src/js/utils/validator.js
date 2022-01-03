import { baseTicketPrice } from './const/lotto.js';

const validMinPrice = (price) => price >= baseTicketPrice;

const validatePurchse = (price) => {
  if (!validMinPrice(price)) {
    throw new Error('1000원 이하 금액을 입력하였습니다.');
  }

  return true;
};

const validateWinningTickets = (winningTicket) => {
  if (!winningTicket.every((ticketNumber) => ticketNumber > 0)) {
    throw Error('당첨번호 입력이 잘 못되었습니다.');
  }
};

export default {
  validatePurchse,
  validateWinningTickets,
};
