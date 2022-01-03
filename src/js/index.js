import Subscriber from './Subscriber.js';
import LottoState from './model/Store.js';
import LottoPurchaseForm from './component/LottoPurchaseForm.js';
import LottoTickets from './component/LottoTickets.js';
import WinningTicketForm from './component/WinningTicketForm.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
// const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

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
  const lottoPurchaseForm = new LottoPurchaseForm(document.querySelector('#lotto-purchase__form'));
  const lottoTickets = new LottoTickets(document.querySelector('#lotto-tickets'));
  const winningTicketForm = new WinningTicketForm(document.querySelector('#winning-ticket__form'));

  lottoPurchaseForm.onSubmit((price) => lottoState.purchaseLotto(price));
  winningTicketForm.onSubmit((winningTicket) => lottoState.setWinningNumbers(winningTicket));
  /**
   * init subscriber
   */
  const ticketsSubscriber = new Subscriber(({ tickets = [] }) => {
    if (!tickets) {
      return;
    }

    lottoTickets.render(tickets);
  });

  const winningNumbersSubscriber = new Subscriber(({ winningNumbers }) => {
    if (!winningNumbers) {
      return;
    }

    console.log(winningNumbers);
  });

  winningNumbersSubscriber.subscribe(lottoState);
  ticketsSubscriber.subscribe(lottoState);
})();
