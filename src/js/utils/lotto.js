import { baseTicketPrice, lottoNumbers, rank, ticketNumbersCount } from './const/lotto.js';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

function chunk(array, lenth = ticketNumbersCount) {
  const chunks = [];
  let i = 0;
    const n = array.length;

  while (i < n) {
    chunks.push(array.slice(i, (i += lenth)));
  }

  return chunks;
}

const getAutoLotto = (count) => [...Array(count)].map((_) => shuffleArray(lottoNumbers).slice(0, 6));

const getRank = (tickets, winningNumbers) => {
  const checkSameCount = (ticket) => {
    const MaxLength = 12;
    return {
      sameCount: MaxLength - new Set([...ticket, ...winningNumbers.slice(0, 6)]).size,
      hasBonus: new Set(ticket).has(winningNumbers[winningNumbers.length - 1]),
    };
  };

  return tickets.reduce((acc, cur) => {
    const { sameCount, hasBonus } = checkSameCount(cur);
    if (sameCount === 6) {
      acc[1].count += 1;
      return acc;
    }

    if (sameCount === 5) {
      const ranking = hasBonus ? 2 : 3;
      acc[ranking].count += 1;
      return acc;
    }

    if (sameCount === 4) {
      acc[4].count += 1;
      return acc;
    }

    if (sameCount === 3) {
      acc[5].count += 1;
      return acc;
    }

    return acc;
  }, rank);
};

const getPurchaseCount = (price) => Math.ceil(price / baseTicketPrice);

export default {
  getAutoLotto,
  getRank,
  getPurchaseCount,
  chunk,
};
