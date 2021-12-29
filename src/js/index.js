import Subscriber from './Subscriber.js';
import LottoState from './model/Store.js';
import LottoPurchaseForm from './component/LottoPurchaseForm.js';
import LottoTickets from './component/LottoTickets.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

console.log($lottoNumbersToggleButton);

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

  lottoPurchaseForm.onSubmit((price) => lottoState.purchaseLotto(price));
  console.log(lottoTickets);
  /**
   * init subscriber
   */
  const ticketsSubscriber = new Subscriber(({ tickets = [] }) => {
    if (!tickets) {
      return;
    }

    lottoTickets.render(tickets);
    console.log(`tickets = ${JSON.stringify(tickets)}`);
  });

  const winningNumbersSubscriber = new Subscriber(({ winningNumbers }) => {
    if (!winningNumbers) {
      return;
    }

    console.log(`winningNumbers = ${JSON.stringify(winningNumbers)}`);
  });

  winningNumbersSubscriber.subscribe(lottoState);
  ticketsSubscriber.subscribe(lottoState);

  lottoState.setState({
    tickets: [],
    winningNumbers: [],
  });
})();
