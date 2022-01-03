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
      validator.validateWinningTickets(winningTicket);
      onSubmit(winningTicket);
    });
  }
}

export default WinningTicketForm;
