import View from './View.js';
import validator from '../utils/validator.js';

const inputName = 'lotto-purchase';
class LottoPurchaseForm extends View {
  constructor({ el, onSubmit }) {
    super(el);
    this.bindEvents(onSubmit);
  }

  bindEvents(onSubmit) {
    this.on('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const { value } = form[inputName];
      validator.validatePurchse(value);

      onSubmit(value);
      form[inputName].disabled = true;
    });
  }

  disable() {
    this.el.querySelector('input').disabled = true;
    this.el.querySelector('button').disabled = true;
  }

  enable() {
    this.el.querySelector('input').disabled = false;
    this.el.querySelector('button').disabled = false;
  }

  reset() {
    this.enable();
    this.el.reset();
  }
}

export default LottoPurchaseForm;
