import { LightningElement, api } from 'lwc';
import dive_assets from '@salesforce/resourceUrl/DBS_Dashboard_Assets';
export default class DemoSpinner extends LightningElement {
    @api isLoaded = false;
    @api message = 'Loading profile'; 
    spinnerImage = dive_assets + '/DBS_Dashboard_Assets/Images/loading_icon.gif';
}

                 
                    