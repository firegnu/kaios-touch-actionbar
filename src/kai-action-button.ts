import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('kai-action-button')
export class KaiActionButton extends LitElement {
  @property({ type: Boolean }) active;

  render() {
    return html`
      <div class="container ${this.active ? 'active' : ''}">
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </div>
    `;
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--gs-00);
        opacity: 0.3;
      }
      .active {
        color: var(--gs-00);
        opacity: 1;
      }
    `;
  }
}
