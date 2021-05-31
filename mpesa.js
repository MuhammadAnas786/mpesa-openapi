import axios from 'axios';
import * as constants from 'constants';
import * as crypto from 'crypto';


export class Pesa {
 
   
    constructor(options, environment) {
        this.BASE_DOMAIN = 'https://openapi.m-pesa.com/';
        this.AUTH_URL = 'ipg/v2/vodafoneGHA/getSession/';
        this.TRANSACTION_ROUTES = {
             b2c: 'ipg/v2/vodafoneGHA/b2cPayment/singleStage/',
             c2b: 'ipg/v2/vodafoneGHA/c2bPayment/singleStage/',
             ddc: 'ipg/v2/vodafoneGHA/directDebitCreation/',
             ddp: 'ipg/v2/vodafoneGHA/directDebitPayment/',
             query: 'ipg/v2/vodafoneGHA/queryTransactionStatus/',
             rt: 'ipg/v2/vodafoneGHA/reversal/',
         };
         this.baseURL
         this.options
     
        if (environment === 'production') {
            this.baseURL = this.BASE_DOMAIN + 'openapi/';
        } else {
            this.baseURL = this.BASE_DOMAIN + 'sandbox/';
        }
        this.options = options;

       

        
    }

    /**
     * getSessionId
     */
     getSessionId() {
        return this.options.sessionId || null;
    }

    /**
     * setSessionId
     */
    setSessionId(sessId){
        this.options.sessionId = sessId;
    }

    async get_session() {
        if (this.options.sessionId == null) {
            const response = await axios({
                method: 'get',
                url: this.baseURL + this.AUTH_URL,
                headers: {
                    Accept: 'application/json',
                    Origin: '*',
                    Authorization: 'Bearer ' + this.encrypt_key(this.options.api_key),
                },
            });
            return response.data;
        } else {
            return await { output_ResponseCode: '', output_ResponseDesc: '', output_SessionID: this.options.sessionId };
        }
    }
   
    encrypt_key(key) {
        const pk = '-----BEGIN PUBLIC KEY-----\n' + this.options.public_key + '\n' + '-----END PUBLIC KEY-----';
        return crypto
            .publicEncrypt({ key: pk, padding: constants.RSA_PKCS1_PADDING }, Buffer.from(key))
            .toString('base64');
    }
    
    async query(data, sessionID) {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.query,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_QueryReference: data.input_QueryReference,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_Country: data.input_Country,
            },
        });
        return response.data;
    }
  
    async c2b(data, sessionID){
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_TransactionReference: data.input_TransactionReference,
                input_PurchasedItemsDesc: data.input_PurchasedItemsDesc,
            },
        });

        return response.data;
    }
   async b2c(data, sessionID){
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_TransactionReference: data.input_TransactionReference,
                input_PurchasedItemsDesc: data.input_PurchasedItemsDesc,
            },
        });
        return response.data;
    }
    
    async b2b(data, sessionID) {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }

        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_PrimaryPartyCode: data.input_PrimaryPartyCode,
                input_ReceiverPartyCode: data.input_ReceiverPartyCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_TransactionReference: data.input_TransactionReference,
                input_PurchasedItemsDesc: data.input_PurchasedItemsDesc,
            },
        });
        return response.data;
    }
   async reverse(data, sessionID){
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_ReversalAmount: data.input_ReversalAmount,
                input_TransactionID: data.input_TransactionID,
                input_Country: data.input_Country,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
            },
        });
        return response.data;
    }
   
   async debit_create(data, sessionID) {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }

        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.ddc,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_AgreedTC: data.input_AgreedTC,
                input_Country: data.input_Country,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_EndRangeOfDays: data.input_EndRangeOfDays,
                input_ExpiryDate: data.input_ExpiryDate,
                input_FirstPaymentDate: data.input_FirstPaymentDate,
                input_Frequency: data.input_Frequency,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_StartRangeOfDays: data.input_StartRangeOfDays,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_ThirdPartyReference: data.input_ThirdPartyReference,
            },
        });
        return response.data;
    }
   
    async debit_payment(data, sessionID) {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }

        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.ddp,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_ThirdPartyReference: data.input_ThirdPartyReference,
            },
        });
        return response.data;
    }
}
