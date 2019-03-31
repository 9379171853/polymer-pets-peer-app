import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
//import './layout-page.js';

/**
 * @customElement
 * @polymer
 */
class PetsPeersAppApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }       
      </style>
     
      <layoute-page></layoute-page>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'pets-peers-app'
      }
    };
  }
}

window.customElements.define('pets-peers-app', PetsPeersAppApp);
