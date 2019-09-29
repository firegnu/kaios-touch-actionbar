import { LitElement, css } from 'lit-element';

export class KaiPage extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--gs-00);
          color: var(--gs-100);
          overflow-x: hidden;
          overflow-y: auto;
        }
      `,
    ];
  }

  get theme() {
    return document.documentElement.dataset.theme;
  }

  set theme(value: string) {
    document.documentElement.dataset.theme = value;
  }

  toggleTheme() {
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }

  newState(properties) {
    const oldValues = history.state;
    const newValues = Object.assign({}, oldValues, properties);
    history.pushState(newValues, this.id);
    Object.keys(properties).forEach(key => (this[key] = properties[key]));
  }
}
