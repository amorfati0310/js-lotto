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
      e.target.reset();
    });
  }
}

export default LottoPurchaseForm;
