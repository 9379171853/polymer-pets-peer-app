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

class MyPets extends PolymerElement {  
  static get properties() {
    return {
    userName :{
      type: String
    }      
    }    
  }

  _handleResponse(event) {
    console.log(event.define);
  }
 
  connectedCallback(){
    super.connectedCallback();
    this.$.ajaxpets.body = {userName:sessionStorage.getItem("username")};
    //this.$.ajaxpets.generateRequest();
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
    method= "post"    
    url="http://10.117.214.180:3001/pets/rest/myPets"
    on-response="_handleResponse"
    content-type="application/json"
    > </iron-ajax>

    <div>Number of My PETS: --{{data.length}} </div><br/>
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
            [[item.status]]          
        </template>   
        </vaadin-grid-column>
      </vaadin-grid>  
    `;
  }  
}

customElements.define('my-pets', MyPets);