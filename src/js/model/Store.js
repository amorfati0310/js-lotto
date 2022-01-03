import lottoUtils from '../utils/lotto.js';

const defaultState = {
  tickets: [],
  winningNumbers: [],
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
      tickets: lottoUtils.getLotto(price),
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
