import { KaiModal } from './kai-modal';
import { customElement, html, property, css } from 'lit-element';
import './kai-button';

@customElement('kai-dialog')
export class KaiDialog extends KaiModal implements KaiModalInterface {
  @property({ type: String, attribute: 'modal-title' }) modalTitle: string;
  @property({ type: String, attribute: 'cancel-label' }) cancelLabel: string;
  @property({ type: String, attribute: 'done-label' }) doneLabel: string;
  @property({ type: Boolean }) remember = false;

  static get styles() {
    return [
      ...super.styles,
      css`
        .remember-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
        }
      `,
    ];
  }

  onCancel() {
    const cancelEvent = new CustomEvent('dialog-cancel', {
      bubbles: true,
      composed: true,
      detail: {
        status: this.remember ? 'deny' : 'ask',
      },
    });
    this.dispatchEvent(cancelEvent);
  }

  onDone() {
    const doneEvent = new CustomEvent('dialog-done', {
      bubbles: true,
      composed: true,
      detail: {
        status: this.remember ? 'allow' : 'ask',
      },
    });
    this.dispatchEvent(doneEvent);
  }

  render() {
    return html`
      <header class="modal-title">
        <kai-text as="h3">${this.modalTitle}</kai-text>
      </header>
      <div class="modal-content">
        <slot></slot>
        <div class="remember-container">
          <kai-text slot="item-content" as="h5">
            remember-my-choice
          </kai-text>
          <kai-checkbox
            slot="item-right"
            @checkbox-change=${(e: KaiControlChangeEvent) => {
        this.remember = e.detail.checked;
      }}
          >
          </kai-checkbox>
        </div>
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
