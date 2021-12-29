import { baseTicketPrice } from './const/lotto.js';

const validMinPrice = (price) => price >= baseTicketPrice;

const validtePurchse = (price) => {
  if (!validMinPrice(price)) {
    throw new Error('1000원 이하 금액을 입력하였습니다.');
  }

  return true;
};

export default {
  validtePurchse,
};
