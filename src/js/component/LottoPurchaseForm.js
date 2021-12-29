import View from './View.js';

const inputName = 'lotto-purchase';
class LottoPurchaseForm extends View {
  constructor(el) {
    super(el);
    this.onSubmit();
  }

  onSubmit(onSubmit) {
    this.on('submit', (e) => {
      e.preventDefault();
      const {value} = e.target[inputName];
      onSubmit(value);
    });
  }
}

export default LottoPurchaseForm;
