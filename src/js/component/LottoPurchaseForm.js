import View from './View.js';
import validator from '../utils/validator.js';

const inputName = 'lotto-purchase';
class LottoPurchaseForm extends View {
  onSubmit(onSubmit) {
    this.on('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const { value } = form[inputName];
      validator.validtePurchse(value);

      onSubmit(value);
      e.target.reset();
    });
  }
}

export default LottoPurchaseForm;
