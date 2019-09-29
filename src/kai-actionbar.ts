import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('kai-actionbar')
class KaiActionBar extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static get styles() {
    return css`
      :host {
        position: sticky;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: var(--gs-100);
        padding: 0 15px;
        box-sizing: border-box;
        overflow: hidden;
        animation: slideIn 0.3s cubic-bezier(0, 0, 0.25, 1) forwards;
      }

      :host::slotted(*) {
        min-width: 25%;
      }

      @keyframes slideIn {
        0% {
          transform: translateY(70px);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
  }
}
