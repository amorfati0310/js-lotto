import View from './View.js';

const switchId = 'lotto-tickets__switch';

class LottoTickets extends View {
  constructor(el) {
    super(el);
    this.init();
  }

  init() {
    this.on('click', (e) => {
      if (e.target.id !== switchId) {
        return;
      }

      const isShown = e.target.checked;
      if (isShown) {
        this.showNumbers();
        return;
      }

      this.hideNumbers();
    });
  }

  showNumbers() {
    this.el.classList.add('show');
  }

  hideNumbers() {
    this.el.classList.remove('show');
  }
}

export default LottoTickets;
