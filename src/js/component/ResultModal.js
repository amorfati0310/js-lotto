import lottoUtils from '../utils/lotto.js';
import View from './View.js';

const resultTableClassName = 'result-table';
const modalCloseClassName = 'modal-close';
const resetId = 'lotto-reset';

class ResultModal extends View {
  constructor({ el, onReset }) {
    super(el);
    this.resultTable = this.el.querySelector(`.${resultTableClassName}`);
    this.modalClose = this.el.querySelector(`.${modalCloseClassName}`);
    this.resetButton = this.el.querySelector(`#${resetId}`);
    this.bindEvents(onReset);
  }

  bindEvents(onReset) {
    this.modalClose.addEventListener('click', () => this.hide());
    this.resetButton.addEventListener('click', () => this.onReset());
    this.on('@reset', () => onReset());
  }

  show() {
    this.el.classList.add('open');
  }

  hide() {
    this.el.classList.remove('open');
  }

  showResult(lottoState) {
    this.render(lottoState);
    this.show();
  }

  onReset() {
    this.emit('@reset');
    this.hide();
  }

  render({ tickets, winningNumbers }) {
    const rank = lottoUtils.getRank(tickets, winningNumbers);
    const rankTemplate = (rankResult) => `
      <thead>
        <tr class="text-center">
          <th class="p-3">일치 갯수</th>
          <th class="p-3">당첨금</th>
          <th class="p-3">당첨 갯수</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="p-3">${rankResult[5].count}개</td>
          <td class="p-3">${rankResult[5].price.toLocaleString()}</td>
          <td class="p-3">${rankResult[5].name}</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">${rankResult[4].count}개</td>
          <td class="p-3">${rankResult[4].price.toLocaleString()}</td>
          <td class="p-3">${rankResult[4].name}</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">${rankResult[3].count}개</td>
          <td class="p-3">${rankResult[3].price.toLocaleString()}</td>
          <td class="p-3">${rankResult[3].name}</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">${rankResult[2].count}개</td>
          <td class="p-3">${rankResult[2].price.toLocaleString()}</td>
          <td class="p-3">${rankResult[2].name}</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">${rankResult[1].count}개</td>
          <td class="p-3">${rankResult[1].price.toLocaleString()}</td>
          <td class="p-3">${rankResult[1].name}</td>
        </tr>
      </tbody>`;

    this.resultTable.innerHTML = rankTemplate(rank);
  }
}

export default ResultModal;
