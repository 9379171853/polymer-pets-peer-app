import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-layout.js';

import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';


import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';

import '@polymer/iron-form/iron-form.js'

import '@polymer/paper-spinner/paper-spinner.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class LayoutPage extends PolymerElement {
  static get template() {
    return html`    
    <style>
      :host {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      .hiddentab{
        visibility:hidden;
        display:none;
      }
     a{
      color: white;
     }
      app-header {
        background-color: blue;
        color: white;
        --app-header-shadow: {
          box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.2);
          height: 10px;
          bottom: -10px;
        };
      } 
      .logo {
        width: 120px;
        height: 40px;
        background-size: 100% 100%;
      } 
      /**
       * Desktop small, tablet
       */
      @media (max-width: 1200px) {
        .logo {
          width: 89px;
          height: 17px;
        }
        #mainToolbar {
          height: 64px;
        }
        shrine-detail {
          height: auto;
        }
      }
      /**
       * Phone
       */
      @media (max-width: 400px) {
        .leftItem [icon=menu] {
          display: block;
        }
        paper-tabs {
          display: none;
        }
      }
    </style>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]"> </app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
   
    <app-header-layout>
          <app-header>
            <app-toolbar>              
              <div main-title="">Pets APP</div>
              <iron-selector selected="[[page]]" attr-for-selected="name"  role="navigation">
              <a name="petslist" href="[[rootpath]]petslist">Pets List</a>
              <a name="registration" href="[[rootPath]]registration">Registration</a>
              <a name="login" href="[[rootPath]]login">Login</a>
              <a name="petadd" href="[[rootPath]]petadd" class="">Add Pet</a>
              <a name="mypets" href="[[rootPath]]mypets" class="">My Pets</a>
            </iron-selector>
            </app-toolbar>
          </app-header>
       <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <pets-list name="petslist"></pets-list>
            <my-registration name="registration"></my-registration>
            <my-login name="login"></my-login>
            <pet-add name="petadd"></pet-add>
            <my-pets name="mypets"></my-pets>
            <my-view404 name="view404"></my-view404>
            </iron-pages>
     </app-header-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  _routePageChanged(page) {    
   if (!page) {
     this.page = 'petslist';
   } else if (['petslist','registration', 'login', 'petadd','mypets'].indexOf(page) !== -1) {
     this.page = page;
   } else {
     this.page = 'view404';
   }
 }

 _pageChanged(page) {   
    switch (page) {
      case 'petslist':
        import('./pets-list.js');
        break;
      case 'registration':
        import('./my-registration.js');
        break;
      case 'login':
        import('./my-login.js');
        break;
      case 'petadd':
        import('./pet-add.js');
        break;
        case 'mypets':
        import('./my-pets.js');
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}
customElements.define('layoute-page', LayoutPage);