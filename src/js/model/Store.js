import lottoUtils from '../utils/lotto.js';

const defaultState = {
  tickets: [],
  winningNumbers: [],
  purchaseCount: 0,
  isPurchasing: false,
  manualPurchaseCount: 0,
  isFinishedManualPurchasing: false,
  showManualSection: false,
};

class LottoState {
  #state;

  #observers = new Set();

  constructor(state = defaultState) {
    this.#state = state;
  }

  setState(newState) {
    this.#state = {
      ...this.#state,
      ...newState,
    };
    console.log(
      (this.#state = {
        ...this.#state,
        ...newState,
      }),
    );

    this.notify(newState);
  }

  addSubscriber(subscriber) {
    this.#observers.add(subscriber);
  }

  notify(newState) {
    this.#observers.forEach((fn) =>
      fn({
        ...this.#state,
        ...newState,
      }),
    );
  }

  getTicketsCount() {
    return this.#state.tickets.length;
  }

  purchaseLotto(price) {
    this.setState({
      purchaseCount: lottoUtils.getPurchaseCount(price),
      isPurchasing: true,
      showManualSection: true,
    });
  }

  setManualPurchaseCount(count) {
    this.setState({
      manualPurchaseCount: count,
    });

    if (count === 0) {
      this.setManualTickets();
    }
  }

  getAutoCount() {
    return this.#state.purchaseCount - this.#state.manualPurchaseCount;
  }

  setManualTickets(tickets = []) {
    const lottoTickets = [...tickets, ...lottoUtils.getAutoLotto(this.getAutoCount())];
    this.setState({
      tickets: lottoTickets,
      isFinishedManualPurchasing: true,
    });
  }

  setWinningNumbers(ticket) {
    this.setState({
      winningNumbers: ticket,
    });
  }

  reset() {
    this.setState(defaultState);
  }
}
export default LottoState;
