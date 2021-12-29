import validator from './validator.js';
import { baseTicketPrice, lottoNumbers } from './const/lotto.js';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const getLotto = (price) => {
  validator.validtePurchse(price);

  const ticketCount = Math.floor(price / baseTicketPrice);
  return [...Array(ticketCount)].map((_) => shuffleArray(lottoNumbers).slice(0, 6));
};

export default {
  getLotto,
};
