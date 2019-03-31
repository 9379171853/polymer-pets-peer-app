

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


class PetAdd extends PolymerElement {

  static get properties() {
    return {
      name:{
        type: String
      },
      age:{
        type:Number
      },
      place:{
        type: String
      },
      status:{
        type: String
      },
      userName:{
        type:String
      }
      // handleResponse: {
      //   type: Object,
      //   notify: true,
      //   readOnly: true 
      // }
    }  
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px;
        }

        .add-pet-button{
          margin-left: 563px;
          background-color: blue;
          color: white;
          font-family: sans-serif; 
        } 
      </style>

      <div>
      <p>Add Pet </p>

      <iron-ajax
      auto
      id=addPetAjax
      body="objPet"
      url="http://10.117.214.180:3001/users/rest/addPet"
      content-type="application/json"
      on-response=handleResponse
      handle-as="json">
      </iron-ajax>

      <iron-form id="addPetForm">
      <form>
      <paper-input 
      type="text" 
      auto-validate required 
      name="name" 
      value={{name}} 
      label="Pet Name" 
      error-message="Pet Name is Required!">
      </paper-input>

      <paper-input 
      type="Number" 
      auto-validate required 
      name="age" 
      value={{age}} 
      label="Pet Age"
      error-message="Pet Age is Required" allowed-pattern="[0-9]">
      </paper-input>

      <paper-textarea 
      auto-validate="true"
      name="place"
      value={{place}} 
      label="Place"
      required
      error-message="Place is Required"
      ></paper-textarea>

      <paper-input 
      type="text"
      auto-validate required
      name="status"
      value={{status}}
      label="Status"
      error-message="Status is Required">
      </paper-input>

      <paper-input 
      type="text"
      auto-validate required
      name="userName"
      value={{userName}}
      label="User Name"
      error-message="User Name is Required">
      </paper-input>      
      <paper-button class="add-pet-button" raised on-click="_handleAddPet"> Add Pet </paper-button>
      <form>
      </iron-form>      
      </div>
    `;
  }

  _handleAddPet(){
    if(this.$.addPetForm.validate()){
      var addPetAjax= this.$.addPetAjax;
      addPetAjax.method='post';
      let objPet={"name":this.name, "age":this.age,"place":this.place,"status":this.status,"userName":this.userName};
      addPetAjax.body=objPet;
      addPetAjax.generateRequest();
    } 
  }

  handleResponse(event){
    console.log(event.detail.response);;
    var status = event.detail.response.status;
   // document.querySelector('pets-peers-app').shadowRoot.querySelector('layoute-page').set('route.path','/mypets');
   if(status === "success"){
    this.set('route.path', '/mypets');
   }
    
  }
}

window.customElements.define('pet-add', PetAdd);
