import Api from "../service/axios"

export const createCustomer = async(customerData:any)=>{
try {
    const response = await Api.post('/api/customer/create',customerData)
    return response.data
} catch (error) {
    throw error
}
}
export const getAllCustomer = async()=>{
    try {
        const response = await Api.get('/api/customer/getAll')
        return response.data
    } catch (error) {
        throw error
    }
}