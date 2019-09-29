import { css, customElement, html, LitElement, property } from 'lit-element';
import './kai-text';
import './kai-icon';

@customElement('kai-button')
class KaiButton extends LitElement {
  @property({ type: String }) type = 'rounded';
  @property({ type: Boolean }) secondary = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) toggle: ToggleStatus;
  @property() size = 32;

  constructor() {
    super();
    this.tabIndex = this.tabIndex > 0 ? this.tabIndex : 0;
  }

  static get styles() {
    return [
      css`
        :host {
          -moz-appearance: button;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          min-width: 14rem;
          /* max-width: calc(100% - 20px); */
          height: 6rem;
          border: none;
          outline: none;
          box-sizing: border-box;
          padding: 1.9rem 2rem;
          border-radius: 3rem;
          background-color: var(--theme-color-primary);
          color: var(--gs-00);
          cursor: default;
        }

        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        :host(:active) {
          transition: background 0.01s;
          background-color: var(--theme-color-dark);
        }

        :host([secondary]) {
          background-color: var(--gs-00);
          color: var(--gs-80);
          border: 0.2rem solid var(--gs-80);
        }

        :host([secondary]:active) {
          background-color: var(--gs-10);
        }

        :host([type='flat']) {
          min-width: unset;
          height: 6rem;
          padding: 0 1rem;
          border-radius: 0;
          background-color: transparent;
          color: var(--theme-color-light);
        }

        :host([type='flat'][toggle='off']) {
          color: var(--gs-100);
        }

        :host([type='flat']:active) {
          transition: color 0.01s;
          color: var(--theme-color-dark);
          background-color: transparent;
        }

        :host([type='flat'][toggle='on']) {
          color: var(--theme-color-primary);
        }

        :host([type='flat'][secondary]) {
          border: none;
          color: var(--gs-60);
        }

        :host([type='flat'][secondary]:active) {
          color: var(--gs-40);
        }

        :host([type='flat-icon'][toggle='off']),
        :host([type='flat-icon']) {
          min-width: unset;
          max-width: unset;
          width: 3.2rem;
          height: 3.2rem;
          padding: 0;
          border-radius: 0;
          background-color: transparent;
          color: var(--gs-100);
        }

        :host([type='flat-icon']:active) {
          transition: color 0.01s;
          color: var(--gs-80);
          background-color: transparent;
        }

        :host([type='flat-icon'][toggle='off']) {
          transition: color 0.15s;
        }

        :host([type='flat-icon'][toggle='on']) {
          color: var(--theme-color-primary);
        }
      `,
    ];
  }

  render() {
    if (this.type === 'flat') {
      return html`
        <kai-text as="sub-1"><slot></slot></kai-text>
      `;
    }
    if (this.type.endsWith('-icon')) {
      return html`
        <kai-icon size="${this.size}"><slot></slot></kai-icon>
      `;
    }
    return html`
      <kai-text as="h4"><slot></slot></kai-text>
    `;
  }
}
