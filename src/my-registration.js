
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js'

class MyRegistration extends PolymerElement {
  static get properties() {
    return {    

      userName: {
        type: String
      },
      contact: {
        type: String
      },
      address: {
        type: String
      },
      password: {
        type: String
      }

    }
  }
  _handleSubmit() {
    if (this.$.demoForm.validate()) {
      var ironAjax = this.$.dataAjax;
      ironAjax.method = 'post';
      let obj = {"userName": this.userName, "contact": this.contact,'address':this.address,'password': this.password};
      ironAjax.body = obj;
      ironAjax.generateRequest();
    }
  }

  postComplete(event){
    var status= event.detail.response;
    console.log(status);
    if(status==="success"){
      sessionStorage.setItem('username',this.userName)
    }
  }

  static get template() {
    return html`
      <style>    
      .reg-button{
        margin-left: 563px;
        background-color: blue;
        color: white;
        font-family: sans-serif; 
      }       
      </style>
      <p> Registration Page </p>    

      <iron-ajax 
      auto
      id="dataAjax"   
      body: "obj"  
      url="http://10.117.214.180:3001/pets/rest/register"
      handle-as="json"
      content-type="application/json"
      on-response="postComplete"     
      ></iron-ajax>
      
    <iron-form id="demoForm">
    <form>
      <paper-input 
      type="text" 
      auto-validate required 
      name="userName" 
      value={{userName}} 
      label="User Name" 
      error-message="User Name is Required!"
     
      >
      </paper-input>

      <paper-input 
      type="text" 
      auto-validate required 
      name="contact" 
      value={{contact}} 
      label="Mobile Number"
      error-message="Mobile Number is Required" allowed-pattern="[0-9]">
      </paper-input>

      <paper-textarea 
      auto-validate="true"
      name="address"
      value={{address}} 
      label="Location"
      required
      error-message="location is Required"
      ></paper-textarea>

      <paper-input 
      type="password"
      auto-validate required
      name="password"
      value={{password}}
      label="Password"
      error-message="password is Required">
      </paper-input>
      
      <paper-button class="reg-button" raised on-click="_handleSubmit"> Register </paper-button>
      </form>
      </iron-form>

      
    `;
  }


}

window.customElements.define('my-registration', MyRegistration);
