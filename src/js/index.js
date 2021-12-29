import Subscriber from './Subscriber.js';
import LottoState from './model/Store.js';
import LottoPurchaseForm from './component/LottoPurchaseForm.js';

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

function main() {
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

  lottoPurchaseForm.onSubmit((price) => lottoState.purchaseLotto(price));

  /**
   * init subscriber
   */
  const ticketsSubscriber = new Subscriber(({ tickets }) => {
    if (!tickets) {
      return;
    }

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
    tickets: [1, 2, 3, 4, 5, 6],
    winningNumbers: [],
  });

  console.log('lottoState', lottoState);
  // lottoState.tickets = [1, 2, 3, 4, 5, 6];
}

// (function () {
//   main();
// })();

main();
