import View from './View.js';
import validator from '../utils/validator.js';
import lottoUtils from '../utils/lotto.js';

const template = (count) =>
  [...new Array(count)]
    .map(
      (_, index) =>
        `<div>
  <h4 class="mt-0 mb-3 text-center">수동 티켓 ${index + 1}</h4>
  <div class="d-flex-between mb-3">
    <input
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
  </div>

</div>
`,
    )
    .join('');

const inputName = 'lotto-manual-purchase';
class LottoManualPurchaseSection extends View {
  constructor({ el, onSubmitManualCount, onSubmitManualTicket }) {
    super(el);
    this.manualCountForm = this.el.querySelector('#manual-count__form');
    this.manualLottoForm = this.el.querySelector('#manual-lotto__form');
    this.bindEvents({ onSubmitManualCount, onSubmitManualTicket });
  }

  bindEvents({ onSubmitManualCount, onSubmitManualTicket }) {
    this.manualCountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const { value } = form[inputName];
      onSubmitManualCount(Number(value));
    });

    this.manualLottoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const manualTickets = [...form.querySelectorAll('input[type="number"]')].map((input) => Number(input?.value));
      validator.validateMinNumber(manualTickets);
      onSubmitManualTicket(lottoUtils.chunk(manualTickets));
    });
  }

  showManualSection() {
    this.el.classList.remove('hide');
  }

  showManualLottoForm() {
    this.manualLottoForm.classList.remove('hide');
  }

  renderManualLottoForm(count) {
    this.manualLottoForm.insertAdjacentHTML('afterBegin', template(count));
  }

  disableManulCountForm() {
    this.manualCountForm.querySelector('input').disabled = true;
    this.manualCountForm.querySelector('button').disabled = true;
  }

  disableManulTicketForm() {
    [...this.manualLottoForm.querySelectorAll('input')].forEach((input) => {
      input.disabled = true;
    });
    this.manualLottoForm.querySelector('button').disabled = true;
  }
}

export default LottoManualPurchaseSection;
