import {LightningElement, api, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'; // import toast message event .

// import apex class and it's methods. 
import getDataFromObject from '@salesforce/apex/dive_Populate_Controller.getDataFromObject'

export default class dive_Populate_Controller extends LightningElement {
    @track searchKey;
    @track data;
    @track error; // to show error message from apex controller.
    @track success; // to show succes message in ui.
    @track InputValues = {
        strName: "test",
        strAddress: "test",
        strCountry: "test",
        strCode: "1",
        strNumber: "1"
      };
    
    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }    
    handleKeyPress(event) {

        alert('Number: '+JSON.stringify(this.InputValues)); 
    }       
    // method for get  accounts.
    populateDashboard() { 
        if(!this.searchKey){
            return;
        } 
        getDataFromObject({ itemID: this.searchKey }) 
            .then(result => { 

                //let full_obj = JSON.stringify(result);
   
                
                let test = result[0].Profile_JSON__c;
                let profile_data = JSON.parse(test);
                alert(JSON.stringify(profile_data));
                alert(JSON.stringify(profile_data.cust_name)); 
                this.data = profile_data.cust_name; 
                 
            })    
            .catch(error => {
                this.error = error;
            });
    }  
}