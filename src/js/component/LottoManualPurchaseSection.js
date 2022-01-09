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
      name="manual"
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      name="manual"
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      name="manual"
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      name="manual"
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      name="manual"
      type="number"
      class="winning-number mx-1 text-center"
      min="1"
      max="45"
    />
    <input
      name="manual"
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

  hideManualSection() {
    this.el.classList.add('hide');
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

  reset() {
    this.hideManualSection();
    this.manualLottoForm.innerHTML = `
    <form 
    data-cy="manual-lotto__form"
    id="manual-lotto__form"
    class="mt-5 hide" 
  >
    <button
      type="submit"
      class="open-result-modal-button mt-5 btn btn-cyan w-100"
    >
      수동 티켓 발급
    </button>
  </form>`;
    this.manualCountForm.innerHTML = `
  <form 
  data-cy="manual-count__form"
  id="manual-count__form"
  class="mt-5" 
>
  <label 
    for="lotto-manual-purchase"
    class="mb-2 d-inline-block"
  >수동 구매할 갯수를 입력해주세요
  </label>
  <div class="d-flex">
    <input 
      class="w-100 mr-2 pl-2"
      data-cy="lotto-manual-purchase"
      name="lotto-manual-purchase"
      type="number"
      placeholder="몇 개를 수동 구매하실지 알려주세요"
      min="0"
      max="10"
    >
    <button class="btn btn-cyan" type="submit">선택</button>
  </div>
</form>
  `;
  }
}

export default LottoManualPurchaseSection;
