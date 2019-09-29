import { customElement, LitElement, css, html, property } from 'lit-element';

@customElement('kai-panel')
class KaiPanel extends LitElement {
  @property({ type: Number, attribute: false }) currentScrollTop = 0;

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      :host(:not([wait])) {
        animation: fadeIn 0.3s forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
