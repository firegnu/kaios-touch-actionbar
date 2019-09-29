import { customElement, property, html, css } from 'lit-element';
import { KaiModal } from './kai-modal';
import './kai-button';

@customElement('kai-selector')
export class KaiSelector extends KaiModal implements KaiSelectorComponent {
  @property({ type: String }) type: 'single' | 'multiple';
  @property({ type: String }) value: any;
  @property({ type: Array }) values = [];

  static get styles() {
    return [
      ...super.styles,
      css`
        .modal-content {
          text-align: center;
        }
      `,
    ];
  }

  onCancel() {
    const cancelEvent = new CustomEvent('selector-cancel', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(cancelEvent);
  }

  onDone() {
    const doneEvent = new CustomEvent('selector-done', {
      bubbles: true,
      composed: true,
      detail: {
        value: {
          selected: this.type === 'single' ? this.value : this.values,
        },
      },
    });
    this.dispatchEvent(doneEvent);
  }

  handleSingleValue = (mutations: MutationRecord[]) => {
    const target = mutations[0].target as HTMLElement;
    if (target.dataset.checked === 'true') {
      this.value = target.dataset.value;
    }
  };

  handleMultipleValue = (mutations: MutationRecord[]) => {
    const target = mutations[0].target as HTMLElement;
    if (target.dataset.checked === 'true') {
      Array.isArray(this.value) && this.value.push(target.dataset.value);
    } else if (Array.isArray(this.value)) {
      const index = this.value.findIndex(value => value === target.dataset.value);
      index > -1 && this.value.splice(index, 1);
    }
  };

  firstUpdated() {
    const observerOptions = <MutationObserverInit>{
      childList: true,
      attributeFilter: ['data-checked'],
      subtree: true,
    };
    const callback = this.type === 'single' ? this.handleSingleValue : this.handleMultipleValue;
    const observer = new MutationObserver(callback);
    observer.observe(this, observerOptions);
  }

  updated() {
    if (this.type === 'single') {
      Array.from(this.children).forEach((item: HTMLElement) => {
        if (item.dataset.value !== this.value.toString()) {
          item.children.item(1).removeAttribute('checked');
        }
      });
    }
  }

  render() {
    return html`
      <header class="modal-title">
        <kai-text as="h3">${this.modalTitle}</kai-text>
      </header>
      <div class="modal-content">
        <slot></slot>
      </div>
      <footer class="modal-actions" style="text-align: center;">
        <kai-button @click="${this.onCancel}" secondary>
          ${this.cancelLabel}
        </kai-button>
        <kai-button @click="${this.onDone}">
          ${this.doneLabel}
        </kai-button>
      </footer>
    `;
  }
}
