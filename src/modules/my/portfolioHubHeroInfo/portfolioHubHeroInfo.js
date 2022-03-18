/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

import { LightningElement, /* wire */} from 'lwc';
import { HERO_DATA } from "./mockHeroData";
// import { getHeroInfo } from "@salesforce/apex/HeroInfoHelper.getHeroInfo";

export default class PortfolioHub_HeroInfoComponent extends LightningElement {


    // Hero info properties for wire service response
    error;                      // populated if error occurs in apex call
    
    profileImgSrc;              // Url to profile image resource    (Job__c.User__r.MediumPhotoUrl)
    heroName;                   // Name to display                  (Job__c.User__r.Name)
    heroTitle;                  // Prospective job title            (Job__c.Name)

    // Status of submitted portfolio (3 states)
    approvalStatus;
    isApproved;
    isRejected;
    isPending = this.isRejected && this.isApproved;
    
    /**
     * Get Hero info from org
     *      profile img source
     *      hero name
     *      hero job title
     *      (portfolio approval status)
     * 
     * SOQL: 
     *  [SELECT Name,Title,Picture,CaseId FROM Contact]
     *  [SELECT Status FROM Case WHERE CaseId =: ]
     */
    // @wire(getHeroInfo) 
    // heroInfo({ error, data }) {
    //     if (error) {
    //         this.error = error;
    //         // TODO: Handle error
    //     }
    // If there's no error, data will be returned
    connectedCallback() {

        
        // DEBUG --- MOCK --- REFACTOR ME
        this.heroName       = HERO_DATA.Name;
    
        this.heroTitle      = HERO_DATA.Title;
        this.profileImgSrc  = HERO_DATA.Picture;
        this.approvalStatus = HERO_DATA.ApprovalStatus;
        this.setApprovalState(HERO_DATA.ApprovalStatus);
    }

    // Helper to set bools representing approval state
    setApprovalState(data) {
        if (!data || data.ApprovalStatus === "Pending") {
            this.isApproved = false;
            this.isRejected = false;
            return;
        }

        if (data.ApprovalStatus === 'Approved') {
            this.isApproved = true;
            this.isRejected = false;
        }
    }
}