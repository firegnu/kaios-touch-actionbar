import { LitElement, html, css, property, customElement } from 'lit-element';
import './kai-icon';
import './kai-text';

@customElement('kai-input')
class KaiInput extends LitElement {
  @property({ type: String, reflect: true }) value = '';
  @property({ type: Number }) maxLength = 400;
  @property({ type: Boolean, reflect: false }) inFocus = false;
  @property({ type: String }) type = 'text';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) label: string;
  @property({ type: Boolean }) autofocus = false;
  @property({ type: String }) error: string;

  static get styles() {
    return css`
      :host {
        outline: none;
        width: 100%;
      }

      div {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        max-height: calc(var(--baseline) * 6);
        padding: 1.5rem 0 1.7rem;
      }

      div::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 1.5rem;
        width: 100%;
        height: 0.2rem;
        background-color: var(--gs-40);
      }

      div.-focus::after {
        background-color: var(--theme-color-primary);
      }

      div.-with-error::after {
        background-color: var(--error-color);
      }

      input {
        display: flex;
        flex: 1;
        width: 100%;
        height: 2.8rem;
        border: none;
        outline: none;
        background: transparent;
        color: var(--gs-100);
        font-size: 1.8rem;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 1rem;
      }

      button {
        background-color: transparent;
        display: flex;
        width: 2.4rem;
        height: 2.4rem;
        border: none;
        color: var(--gs-40);
      }

      label {
        position: absolute;
        top: 1.5rem;
        left: 0;
        width: 100%;
        height: 2.8rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: var(--gs-80);
        font-size: 1.8rem;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.1s;
      }

      label.-filled,
      input:focus + label {
        top: 0;
        height: 1.5rem;
        font-size: 1.2rem;
      }

      input:focus + label {
        color: var(--gs-100);
      }

      div.-with-error label,
      .exclamation,
      .error-message {
        color: var(--error-color);
      }

      .exclamation {
        animation: rotate 0.5s cubic-bezier(0.8, -0.5, 0.2, 1.4) forwards;
      }

      .error-message {
        position: absolute;
        left: 0;
        bottom: 0;
      }

      @keyframes rotate {
        0% {
          opacity: 0;
          transform: rotate(-45deg);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: rotate(0);
        }
      }
      :host([type="search"]) div {
        padding-inline-start: 3.2rem;
      }

      :host([type="search"]) .search-icon {
        position: absolute;
        left: 0;
        top: 1.5rem;
        color: var(--gs-40);
      }

      :host([type="search"]) div.-focus .search-icon {
        color: var(--gs-100);
      }
      
      .del {
        background-color: var(--gs-00);
      }
    `;
  }

  constructor() {
    super();
    this.tabIndex = this.tabIndex < 0 ? 0 : this.tabIndex;
  }

  clear() {
    this.value = '';
    const inputChangeEvent = this.customEvent('change', '');
    this.dispatchEvent(inputChangeEvent);
    this.shadowRoot.getElementById('text-field').focus();
  }

  customEvent(type: string, value: string): CustomEvent<KaiInputEventDetail> {
    return new CustomEvent(`input-${type}`, {
      bubbles: true,
      composed: true,
      detail: {
        value,
      },
    });
  }

  handleChange(e) {
    const input = <HTMLInputElement>e.target;
    const value = input.value;
    this.value = input.value;
    const inputChangeEvent = this.customEvent('change', value);
    this.dispatchEvent(inputChangeEvent);
  }

  handleFocus({ type, target }: FocusEvent) {
    const input = <HTMLInputElement>target;
    this.inFocus = type === 'focus';
    const inputFocusEvent = this.customEvent(type, input.value);
    this.dispatchEvent(inputFocusEvent);
  }

  firstUpdated() {
    if (this.autofocus) {
      this.shadowRoot.getElementById('text-field').focus();
    }
  }

  render() {
    let className = this.inFocus ? '-focus' : '';
    className += this.error ? ' -with-error' : '';
    return html`
      <div class="${className}">
        ${
        this.type === 'search'
          ? html`
                <kai-icon class="search-icon" size="32">search</kai-icon>
            `
          : null
        }
        <input
          id="text-field"
          .type="${this.type}"
          maxlength="${this.maxLength}"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          @input="${this.handleChange}"
          @focus="${this.handleFocus}"
          @blur="${this.handleFocus}"
        />
        ${this.label
        ? html`
              <label class="${this.value.length ? '-filled' : ''}">
                ${this.label}
              </label>
            `
        : null}
        ${this.value.length
        ? html`
              <button @click="${this.clear}" tabindex="-1">
                <kai-icon class="del">input-clear</kai-icon>
              </button>
            `
        : null}
        ${this.error
        ? html`
              <kai-icon class="exclamation">exclamation</kai-icon>
              <kai-text as="h6" class="error-message">${this.error}</kai-text>
            `
        : null}
      </div>
    `;
  }
}
