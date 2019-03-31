import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js'
import '@vaadin/vaadin-grid/src/vaadin-grid-templatizer.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-styles.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-column-group.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-column.js';

class PetsList extends PolymerElement {
  constructor() {
    super();
  }
  ready() {
    super.ready();
    let ajaxCall = this.$.ajaxpets;
    ajaxCall.url = "http://10.117.214.180:3001/pets/rest/allPets";
    // ajaxCall.onResponse = "_handleResponse";
  }
  static get properties() {
    return {
      data: Array,
      actionType: {
        type: String,
        value: 'list'
      }
    }
  }

  _handleResponse(event) {
    console.log(this.actionType)
    if (this.actionType === 'list') {
      this.data = event.detail.response;
      console.log(event.detail.response);
    } else {
      this.actionType = 'list';
      let ajaxCall = this.$.ajaxpets;
      ajaxCall.method = 'GET';
      ajaxCall.url = "http://10.117.214.180:3001/pets/rest/allPets";
      //ajaxCall.generateRequest();
    }

  }

  checkStatus(status) {
    console.log("status", status)
    if (status === "New") {      
      return true;
    } else {
      return false;
    }
  }


  _buySubmit(e) {
    this.actionType = 'buy';
    var item = e.model.item;
    //this.editing = item;
    console.log(item);
    var ajaxpets = this.$.ajaxpets;
    ajaxpets.method = "post";
    
    let obj = { id: item.id, userName: sessionStorage.getItem("username") };
    console.log(obj);
    ajaxpets.body = JSON.stringify(obj);
    ajaxpets.url = "http://10.117.214.180:3001/pets/rest/buyPet",
    ajaxpets.generateRequest();
  }


  static get template() {
    return html`
    <style>        
      paper-button.indigo {
        background-color: gray;
        color: white;           
      }

      .reg-button{
       
        background-color: blue;
        color: white;
        font-family: sans-serif; 
      } 
      
    </style>
    <p>PETS details </p>
    <iron-ajax 
    auto 
    id="ajaxpets"
    url="http://10.117.214.180:3001/pets/rest/allPets"
    on-response="_handleResponse"
    content-type="application/json"
    > </iron-ajax>
    <div>Number of PETS: --{{data.length}} </div><br/>
    <vaadin-grid id="vGrid1" items={{data}} column-reordering-allowed >
        <vaadin-grid-column>
          <template class="header">Id</template>
          <template>[[item.id]]</template>
       </vaadin-grid-column>
      <vaadin-grid-column>
          <template class="header">Name</template>
          <template>[[item.name]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Age</template>
          <template>[[item.age]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Bought By</template>
          <template>[[item.boughtBy]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Created By</template>
          <template>[[item.createdBy]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
        <template>
        <template class="header">Action</template>
          <template is="dom-if" if="[[checkStatus(item.status)]]">
           
          <paper-button class="reg-button" raised on-click="_buySubmit">BUY </paper-button>
          </template>
          <template is="dom-if" if="[[!checkStatus(item.status)]]">
            [[item.status]]
          </template>
        </template>
        
        
        </vaadin-grid-column>
        
      </vaadin-grid>  
    `;
  }

  // _handleResponse(event){
  //   var status= event.detail.response;
  //   console.log(status);
  // }

}

customElements.define('pets-list', PetsList);