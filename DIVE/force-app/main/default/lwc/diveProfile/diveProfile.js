import { LightningElement, api } from 'lwc';
export default class dive_Profile extends LightningElement {
    @api profileObj; 
    @api showProfileSpinner = false;
}      