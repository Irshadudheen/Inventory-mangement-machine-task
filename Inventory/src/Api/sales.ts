import Api from "../service/axios"

export const placeorder = async(placeorderData:any,customerId:string)=>{
    try {
        const response = await Api.post(`/api/sales/placeorder/${customerId}`,placeorderData)
        return response.data
        
    } catch (error) {
        throw error
    }
}
