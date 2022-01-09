import View from './View.js';
import validator from '../utils/validator.js';

class WinningTicketForm extends View {
  constructor({ el, onSubmit }) {
    super(el);
    this.bindEvents(onSubmit);
  }

  bindEvents(onSubmit) {
    this.on('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const winningTicket = [...form.querySelectorAll('input[type="number"]')].map((input) => Number(input?.value));
      validator.validateMinNumber(winningTicket);
      onSubmit(winningTicket);
    });
  }

  show() {
    this.el.classList.remove('hide');
  }

  reset() {
    this.el.classList.add('hide');
    this.el.reset();
  }
}

export default WinningTicketForm;
