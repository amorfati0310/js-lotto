export const lottoNumbers = [...Array(45).keys()].map((v) => v + 1);
export const baseTicketPrice = 1000;
export const ticketNumbersCount = 6;
export const rank = {
  1: {
    count: 0,
    price: 2000000000,
    name: '6개',
  },
  2: {
    count: 0,
    price: 30000000,
    name: '5개 + 보너스볼',
  },
  3: {
    count: 0,
    price: 1500000,
    name: '5개',
  },
  4: {
    count: 0,
    price: 50000,
    name: '4개',
  },
  5: {
    count: 0,
    price: 5000,
    name: '3개',
  },
};
