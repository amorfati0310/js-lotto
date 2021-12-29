import View from './View.js';

class LottoTickets extends View {
  constructor(el) {
    super(el);
    this.init();
  }

  init() {
    this.on('click', (e) => {
      e.preventDefault();
    });
  }
}

export default LottoTickets;
