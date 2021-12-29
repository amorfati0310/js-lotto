import View from './View.js';

const switchId = 'lotto-tickets__switch';
const countId = 'lotto-tickets__count';

const ticketsClassName = 'lotto-ticktes';
class LottoTickets extends View {
  constructor(el) {
    super(el);
    this.ticketsEl = this.el.querySelector(`.${ticketsClassName}`);
    this.countsEl = this.el.querySelector(`#${countId}`);
    this.init();
  }

  init() {
    this.on('click', (e) => this.handleClickSwitch(e));
    this.render();
  }

  handleClickSwitch(e) {
    if (e.target.id !== switchId) {
      return;
    }

    const isShown = e.target.checked;
    if (isShown) {
      this.showNumbers();
      return;
    }

    this.hideNumbers();
  }

  showNumbers() {
    this.el.classList.add('show');
  }

  hideNumbers() {
    this.el.classList.remove('show');
  }

  render(tickets = []) {
    this.renderTotal(tickets.length);
    this.renderTickets(tickets);
  }

  renderTotal(count) {
    this.countsEl.innerHTML = `총 ${count}개를 구매하였습니다.`;
  }

  renderTickets(tickets) {
    this.ticketsNumbersEl.innerHTML = tickets
      .map(
        (ticket) => `<p class="d-flex" data-cy="lotto-ticket">
                          <span class="mx-1 text-4xl">🎟️ </span>
                          <span class="mx-1 text-4xl lotto-ticket-numbers">${ticket.join(', ')}</span>
                      </p>`,
      )
      .join('');
  }
}

export default LottoTickets;
