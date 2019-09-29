import { customElement, LitElement, css, html, property } from 'lit-element';

@customElement('kai-options')
class KaiOptions extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) openSubMenu = false;
  @property({ type: Object }) position: OptionsMenuPosition;

  static get styles() {
    return css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: var(--z-index-options);
      }

      :host([open]) {
        pointer-events: all;
      }

      .out {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 0;
      }

      .menu ::slotted(kai-button) kai-icon {
        position: absolute;
        right: 0;
      }

      .menu ::slotted(kai-button) + .submenu {
        display: none;
      }

      .menu ::slotted(kai-button[submenu]) + .submenu {
        display: block;
        padding-left: 1.1rem;
      }

      .menu ::slotted(kai-button[submenu]) + .submenu kai-button {
        color: var(--gs-20);
      }

      .menu ::slotted(kai-button[submenu]) + .submenu kai-button kai-text {
        font-size: calc(var(--baseline) * 1.6);
      }

      .menu ::slotted(kai-button) kai-text {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .menu ::slotted(kai-button[submenu]) kai-icon {
        color: #0073e6;
        transform: rotate(90deg);
      }

      .menu {
        position: fixed;
        min-width: 21.6rem;
        max-width: 60%;
        background-color: var(--gs-100);
        padding: 2rem 1.5rem;
        transform: scale(0.8) translate(0, -3rem);
        opacity: 0;
        transition-property: opacity, transform;
        transition-delay: 0, 0.15s;
        transition-duration: 0.12s;
        transition-timing-function: cubic-bezier(0, 0, 0, 1);
        z-index: 1;
      }

      :host([open]) .menu {
        opacity: 1;
        transform: scale(1) translate(0, 0);
        transition-duration: 0.15s, 0.24s;
      }

      .menu ::slotted(kai-button) {
        width: 100%;
        justify-content: flex-start;
        margin: 0;
        max-width: unset;
        /* width: calc(100% - 1rem); */
        height: 6rem;
        color: var(--gs-00);
        transform: translate(0, -2rem);
        opacity: 0;
        transition-property: opacity, transform;
        transition-duration: 0.12s, 0;
        transition-delay: 0, 0.12s;
        transition-timing-function: cubic-bezier(0, 0, 0, 1);
      }

      :host([open]) .menu ::slotted(kai-button) {
        transform: translate(0, 0);
        opacity: 1;
        transition-property: opacity, transform;
        transition-delay: 0.12s;
        transition-duration: 0.12s, 0.3s;
      }
    `;
  }

  changePosition() {
    const menu = this.shadowRoot.getElementById('options-menu');
    const { top, right, bottom, left } = this.position;
    menu.style.top = top;
    menu.style.right = right;
    menu.style.bottom = bottom;
    menu.style.left = left;
    if (top && right) {
      menu.style.transformOrigin = 'right top';
      menu.style.borderRadius = '3rem 0.2rem 3rem 3rem';
    }
    if (bottom && right) {
      menu.style.transformOrigin = 'right bottom';
      menu.style.borderRadius = '3rem 3rem 0.2rem 3rem';
    }
    if (top && left) {
      menu.style.transformOrigin = 'left top';
      menu.style.borderRadius = '0.2rem 3rem 3rem 3rem';
    }
    if (bottom && left) {
      menu.style.transformOrigin = 'left bottom';
      menu.style.borderRadius = '3rem 3rem 3rem 0.2rem';
    }
  }

  updated(changes: Map<string, any>) {
    changes.has('position') && this.changePosition();
  }

  touchOut() {
    const touchOutEvent = new CustomEvent('options-touchout', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(touchOutEvent);
  }

  render() {
    return html`
      <div class="out" @click="${this.touchOut}"></div>
      <div id="options-menu" class="menu">
        <slot></slot>
      </div>
    `;
  }
}
