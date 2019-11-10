import { LightningElement, track } from 'lwc';
import {convertToValidDate,getDate} from 'c/diveUtilities';
 
// import apex class and it's methods. 
import getDataFromObject from '@salesforce/apex/dive_Populate_Controller.getDataFromObject'

export default class dive_Populate_Controller extends LightningElement {
    @track searchKey;
    @track profileData = {
        cust_title: "",
        cust_name: "",
        cust_surname: "",
        cust_id: "",
        Access_Account_Number__c: ""
    }; 
    @track debitOrders;
    @track recentTransactions;
    @track iipHolds; 
    @track callHistory;
    @track simHolds;
    @track error; // to show error message from apex controller.
    @track success; // to show succes message in ui.  

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }
    // method for get  accounts.
    populateDashboard() {
        if (!this.searchKey) {
            return;
        }
        getDataFromObject({ itemID: this.searchKey })
            .then(result => {
    
                this.profileData = JSON.parse(result[0].Profile_JSON__c);
                let debit_orders = JSON.parse(result[0].Debit_Orders_JSON__c);
                let recent_transactions = JSON.parse(result[0].Recent_Transactions_JSON__c);
                let call_history = JSON.parse(result[0].Call_History_JSON__c);
                let ipp_holds = JSON.parse(result[0].IIP_JSON__c);
                let sim_holds = JSON.parse(result[0].Sim_Holds_JSON__c);

                let set_debits = [];
                let set_recent_trans = [];
                let set_call_history = [];
                let set_ipp_holds = [];
                let set_sim_holds = [];

                //Debit orders
                for (let key in debit_orders) {
                    if (key) {
                        let record = debit_orders[key];
                        record.debit_order_transaction_class = ''; 

                        let action_date = convertToValidDate(record.action_date); 
                        record.action_date = getDate(action_date); 
  
                        set_debits.push({
                            value: record,
                            key: key
                        });
                    }
                }
                this.debitOrders = set_debits;

                //Recent transactions
                for (let key in recent_transactions) {
                    if (key) {
                        let record = recent_transactions[key];

                        set_recent_trans.push({
                            "key": key,
                            "relationship": "parent",
                            "row_class": "",
                            "icon_class": "circle_icon_plus",
                            "trans_date": record.date,
                            "trans_time": record.time,
                            "trans_amount": record.requested_amount,
                            "trans_channel": record.payment_channel,
                            "trans_reference": record.reference_number,
                            "trans_description": record.description
                        });
                    }
                }
                this.recentTransactions = set_recent_trans;
 
                //IIP holds
                for (let key in ipp_holds) {
                    if (key) {
                        let record = ipp_holds[key];
                        record.action_button_disabled = true;
 
                        record.formatted_created_date = record.record_date+'.'; 
                        record.formatted_created_time = '.'; //test.utilities.formattedTime(record.record_time); 
                        record.formatted_created_time = record.record_time+'.';
                        record.formatted_status_notes = record.details+'.';

                        record.formatted_amount = '.'+record.amount; 
        
                        set_ipp_holds.push({
                            value: record,
                            key: key
                        });
                    }
                }
                this.iipHolds = set_ipp_holds;  
                //console.log(JSON.stringify(this.ippHolds));

                //Call history
                for (let key in call_history) {
                    if (key) {
                        let record = call_history[key];

                        set_call_history.push({
                            value: record,
                            key: key
                        });
                    }
                }
                this.callHistory = set_call_history;

                //Sim holds
                for (let key in sim_holds) {
                    if (key) {
                        let record = sim_holds[key];
                        set_sim_holds.push({
                            value: record,
                            key: key
                        });
                    }
                }
                this.simHolds = set_sim_holds;
            })
            .catch(error => {
                this.error = error;
            });
    }
}