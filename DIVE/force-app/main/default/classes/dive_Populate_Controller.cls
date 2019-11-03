public with sharing class dive_Populate_Controller {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String accName){
        String key = '%'+accName+'%';
        return [select id, Name,Phone, Industry, accountNumber,CreatedDate from Account where name like :key Limit 10];
     }

    @AuraEnabled(Cacheable = true)
    public static List<Account> getAccounts(){
      return [SELECT Id, Name, Phone, AccountNumber, Industry, CreatedDate FROM Account ORDER BY createddate DESC  Limit 10];
    }  
 
    @AuraEnabled
    public static List<Robot_Data_Retrieval__c> getDataFromObject(String itemID) {    
        List<Robot_Data_Retrieval__c> data = [select Id,ID_Number__c, Robot_Item_Exception_Reason__c,IIP_JSON__c,Name, Access_Account_Number__c, Profile_JSON__c,Debit_Orders_JSON__c, Recent_Transactions_JSON__c, Call_History_JSON__c, Sim_Holds_JSON__c, Robot_Item_Status__c from Robot_Data_Retrieval__c where Name=: itemID LIMIT 1];
        if(!data.IsEmpty()){            
            if(data[0].Profile_JSON__c != NULL){
                string profileData = data[0].Profile_JSON__c.replace('\'','"');
                System.debug(profileData);
                Map<String,Object> objectMap = (Map<String,Object>)JSON.deserializeUntyped(profileData);
                String cleanedObject = String.valueOf(objectMap).replace('\'','"');
                System.debug(cleanedObject);  
                data[0].Profile_JSON__c = profileData; 
            }         
        }
        return data;
    } 

}
