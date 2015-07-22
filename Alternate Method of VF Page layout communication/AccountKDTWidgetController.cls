public class AccountKDTWidgetController {
	//the following constants are in pixels
	@TestVisible private static final integer HEIGHT_ROW_HEADER = 23;
	private static final integer HEIGHT_ROW_DATA = 25;
	private static final integer HEIGHT_SURROUNDING_PAGEBLOCK = 19;
	//
	private Account thisAcct { get; set; }
	public list<Known_Data_Type__c> parentKDTs { get; set; }
	public AccountKDTWidgetController( ApexPages.StandardController controller ){
		thisAcct = [	SELECT ID, KDT_Status_Service_Data_Hist_Origin__c, KDT_Status_Service_Data_Origin__c, KDT_Status_Sold_Vehicle_Hist_Origin__c, KDT_Status_Sold_Vehicle_Origin__c, KDT_Status_Vehicle_Inventory_Origin__c
						FROM Account
						WHERE ID = : controller.getID() ];
		
		parentKDTs = [	SELECT ID, Name, Sub_Type__c, Account__r.Name, Account__c, Software_Name__c, Has_Duplicate__c, Effective_Frequency__c, Status__c, Number_Of_Days_Late__c, Records_Loaded__c, Records_Expected__c, Last_Received_Date__c, Last_Loaded_Date__c
						FROM Known_Data_Type__c
						WHERE	ID = :thisAcct.KDT_Status_Service_Data_Hist_Origin__c OR
								ID = :thisAcct.KDT_Status_Service_Data_Origin__c OR
								ID = :thisAcct.KDT_Status_Sold_Vehicle_Hist_Origin__c OR
								ID = :thisAcct.KDT_Status_Sold_Vehicle_Origin__c OR
								ID = :thisAcct.KDT_Status_Vehicle_Inventory_Origin__c ];
						
	}
	
	public integer getSizeOfWidget(){
		system.debug( parentKDTs );
		system.debug( !parentKDTs.isEmpty() );
		return !parentKDTs.isEmpty() ? ( HEIGHT_SURROUNDING_PAGEBLOCK + HEIGHT_ROW_HEADER +  HEIGHT_ROW_DATA * parentKDTs.size() ) : HEIGHT_ROW_HEADER; // we use header height because we are going to place a message in there
		
	}
	
	
	public boolean getRenderWidget(){
		return !parentKDTs.isEmpty();
	}
	
	public String getBaseURL(){
		return URL.getSalesforceBaseURL().toExternalForm(); 
	}
	
}