import { Pesa } from '../mpesa'
import { MPESA_API_KEY,MPESA_ENVIRONMENT,MPESA_PUBLIC_KEY } from '../config'
const MpesaInstance = {
    RunSample:async (req,res)=>{
        const pesa = new Pesa({
            'api_key' : MPESA_API_KEY,
            'public_key' : MPESA_PUBLIC_KEY,
        },  MPESA_ENVIRONMENT);

        let data = {
            input_Amount: 5000,
            input_CustomerMSISDN: '000000000001',
            input_Country: 'GHA',
            input_Currency: 'GHS',
            input_ServiceProviderCode: '000000',
            input_TransactionReference: 'T12344Z',
            input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5d',
            input_PurchasedItemsDesc: 'Test Three Item',
        };

        pesa.c2b(data,null)
        .then((data) => {
            // print results
           return response(res,200,data)
        })
        .catch((er) => {
            // print error
            return response(res,400,er)
        });
        return pesa;
        
    }
}

const response = (res,status,body) =>{
    res.status(status).json(body)
}
export default MpesaInstance;