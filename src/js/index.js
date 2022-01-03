import Subscriber from './Subscriber.js';
import LottoState from './model/Store.js';
import LottoPurchaseForm from './component/LottoPurchaseForm.js';
import LottoTickets from './component/LottoTickets.js';
import WinningTicketForm from './component/WinningTicketForm.js';
import ResultModal from './component/ResultModal.js';

(function main() {
  /**
   * init store
   */
  const lottoState = new LottoState({
    tickets: [],
    winningNumbers: [],
  });

  /**
   * init views
   */
  const lottoPurchaseForm = new LottoPurchaseForm({
    el: document.querySelector('#lotto-purchase__form'),
    onSubmit: (price) => lottoState.purchaseLotto(price),
  });
  const lottoTickets = new LottoTickets({
    el: document.querySelector('#lotto-tickets'),
  });
  const winningTicketForm = new WinningTicketForm({
    el: document.querySelector('#winning-ticket__form'),
    onSubmit: (winningTicket) => lottoState.setWinningNumbers(winningTicket),
  });
  const resultModal = new ResultModal({
    el: document.querySelector('.modal'),
    onReset: () => lottoState.reset(),
  });

  /**
   * init subscriber
   */
  const ticketsSubscriber = new Subscriber(({ tickets = [] }) => {
    if (!tickets) {
      return;
    }

    lottoTickets.render(tickets);
  });

  const winningNumbersSubscriber = new Subscriber(({ tickets, winningNumbers }) => {
    if (!winningNumbers.length || !tickets.length) {
      return;
    }

    resultModal.showResult({ winningNumbers, tickets });
  });

  winningNumbersSubscriber.subscribe(lottoState);
  ticketsSubscriber.subscribe(lottoState);
})();
