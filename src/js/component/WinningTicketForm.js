import View from './View.js';

class WinningTicketForm extends View {
  onSubmit(onSubmit) {
    this.on('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const winningTicket = [...form.querySelectorAll('input[type="number"]')].map((input) => input?.value);
      onSubmit(winningTicket);
      e.target.reset();
    });
  }
}

export default WinningTicketForm;
