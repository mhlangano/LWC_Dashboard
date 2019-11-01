public with sharing class dive_Populate_Controller {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey){
        String key = '%'+searchKey+'%';
        return [select id, Name, accountNumber from Account where name like :key Limit 10];
     }
}
