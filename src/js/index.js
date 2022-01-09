import Subscriber from './Subscriber.js';
import LottoState from './model/Store.js';
import LottoPurchaseForm from './component/LottoPurchaseForm.js';
import LottoManualPurchaseSection from './component/LottoManualPurchaseSection.js';
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

  const lottoManualPurchaseSection = new LottoManualPurchaseSection({
    el: document.querySelector('#manual-purchase__section'),
    onSubmitManualCount: (count) => lottoState.setManualPurchaseCount(count),
    onSubmitManualTicket: (tickets) => lottoState.setManualTickets(tickets),
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
  const lottoSubScriber = new Subscriber(
    ({
      tickets,
      winningNumbers,
      purchaseCount,
      showManualSection,
      manualPurchaseCount,
      isFinishedManualPurchasing,
    }) => {
      if (purchaseCount) {
        lottoPurchaseForm.disable();
      }

      if (manualPurchaseCount) {
        lottoManualPurchaseSection.disableManulCountForm();
      }

      if (showManualSection) {
        lottoManualPurchaseSection.showManualSection();
      }

      if (isFinishedManualPurchasing) {
        lottoManualPurchaseSection.disableManulTicketForm();
      }

      if (!isFinishedManualPurchasing && manualPurchaseCount) {
        lottoManualPurchaseSection.showManualLottoForm();
        lottoManualPurchaseSection.renderManualLottoForm(manualPurchaseCount);
      }

      if (tickets.length) {
        lottoTickets.show();
        lottoTickets.renderTickets(tickets);
        lottoTickets.renderTotal(purchaseCount);
        winningTicketForm.show();
      }

      if (winningNumbers.length && tickets.length) {
        resultModal.showResult({ winningNumbers, tickets });
      }

      if (purchaseCount === 0) {
        lottoPurchaseForm.reset();
        lottoManualPurchaseSection.reset();
        lottoTickets.reset();
        winningTicketForm.reset();
      }
    },
  );

  lottoSubScriber.subscribe(lottoState);
})();
