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
    this.#observers.forEach((fn) => fn(newState));
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
    console.log('ticket', ticket);
    this.setState({
      winningNumbers: ticket,
    });
  }
}
export default LottoState;
