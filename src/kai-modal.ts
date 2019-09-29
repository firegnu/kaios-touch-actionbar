import { css, LitElement, property } from 'lit-element';

export class KaiModal extends LitElement {
  @property({ type: String, attribute: 'modal-title' }) modalTitle: string;
  @property({ type: String, attribute: 'cancel-label' }) cancelLabel: string;
  @property({ type: String, attribute: 'done-label' }) doneLabel: string;

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          width: calc(var(--baseline) * 30);
          max-height: 100%;
          outline: none;
        }

        .modal-title {
          width: 100%;
          height: 3.2rem;
          padding: 0 2rem;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          margin-bottom: 1.2rem;
          font-size: 2.2rem;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-bottom: 3rem;
          border-radius: 3rem;
          border: solid 0.2rem var(--gs-80);
          padding: 2.5rem 2rem;
          overflow-y: auto;
          background-color: var(--gs-00);
          color: var(--gs-100);
        }

        .modal-actions {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .modal-actions ::slotted(kai-button:first-of-type:not(:only-of-type)) {
          margin-right: 2rem;
        }
      `,
    ];
  }

  onDone() {}

  onCancel() {}
}
